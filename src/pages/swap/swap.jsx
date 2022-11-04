import React, { useEffect, useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import MainLayout from "../../components/MainLayout";
import SwapArrow from "../../components/Swap/components/SwapArrow";
import SelectTokenInputPanel from "../../components/Swap/components/SelectTokenInputPanel";
import SelectTokenModal from "../../components/SelectTokenModal";
import TokenFeeAccordion from "../../components/Swap/components/TokenFeeAccordian";
import SwapSettingModal from "../../components/Swap/components/SwapSettingModal";
import TransactionFailed from "../../components/Swap/components/SwapTranscationModals/TransactionFailed";
import TransactionSubmitted from "../../components/Swap/components/SwapTranscationModals/TranscationSubmited";
import { returnTokenList, TokenDetails } from "./components/tokenDetails";
import { getPairAddress } from "../../logic/contracts/getPairAddress";
import { isPairExist } from "../../logic/helpers/isPairExist";
import { getAmounts } from "../../logic/contracts/getAmounts";
import { getAllowance } from "../../logic/contracts/getAllowance";
import { getTokenApproval } from "../../logic/contracts/getTokenApproval";
import { useDispatch, useSelector } from "react-redux";
import PendingModal from "../../components/Swap/components/PendingModal";
import {
  setDeadLine,
  setTransactionFailed,
  setTransactionPending,
  setTransactionSuccess,
} from "../../logic/redux/slices/userWallet";
import { swapContracts } from "../../logic/contracts/swapContracts";
import { positiveNumRegex } from "../../shared/regex";
import {
  convertToWei,
  handleMaxSold,
  handleMinReceive,
} from "../../shared/helpers/helper";
import { toWei } from "web3-utils";

const Swap = () => {
  const { account, library } = useWeb3React();
  const dispatch = useDispatch();
  const {
    transactionPending,
    transactionSuccess,
    transactionFailed,
    deadLine,
    slippage,
  } = useSelector((state) => state.userWallet);

  const [showSelectTokenModal, setShowSelectTokenModal] = useState(false);
  const [pendingModal, setPendingModal] = useState(false);
  const [showTransactionSubmitted, setShowTransactionSubmitted] =
    useState(false);
  const [showTransactionFailed, setShowTransactionFailed] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [swap, setSwap] = useState(false);
  const [tokenOne, setTokenOne] = useState(TokenDetails[0]);
  const [tokenTwo, setTokenTwo] = useState("");
  const [tokenList, setTokenList] = useState(TokenDetails);
  const [tokenType, setTokenType] = useState("");
  const [enteredIn, setEnteredIn] = useState("");
  const [tokenOneAmount, setTokenOneAmount] = useState("");
  const [tokenTwoAmount, setTokenTwoAmount] = useState("");
  const [allowance, setAllowance] = useState("");
  const [btnStatus, setBtnStatus] = useState("Swap");
  const [btnDisabled, setBtnDisabled] = useState(true);

  const getUpdatedTokenDetails = async () => {
    const tokenData = await returnTokenList(TokenDetails, account, library);
    setTokenList(tokenData);
  };

  useEffect(() => {
    if (account && library) {
      getUpdatedTokenDetails();
    }
  }, [account, library]);

  const menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShowSettingModal(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleTokenSelectFun = (selectedToken) => {
    if (tokenType === "send") {
      setTokenOne(selectedToken);
    } else if (tokenType === "receive") {
      setTokenTwo(selectedToken);
    }
    setShowSelectTokenModal(false);
  };

  const checkAllowance = async () => {
    if (account && tokenOne.address) {
      try {
        const res = await getAllowance(account, tokenOne.address, library);
        setAllowance(res);
      } catch (error) {}
    }
  };

  useEffect(() => {
    checkAllowance();
  }, [account, tokenOne.address, tokenOne.balance]);

  const checkBtnStatus = () => {
    if (tokenOneAmount && tokenTwoAmount && tokenOne && tokenTwo) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }

    if (parseFloat(tokenOneAmount) > parseFloat(tokenOne.balance)) {
      setBtnStatus("Insufficient " + tokenOne.symbol + " balance");
      setBtnDisabled(true);
    } else if (tokenOne.symbol === "WETH" && tokenTwo.symbol === "ETH") {
      setBtnStatus("Unwrap");
    } else if (tokenOne.symbol === "ETH" && tokenTwo.symbol === "WETH") {
      setBtnStatus("Wrap");
    } else if (tokenOneAmount && allowance && tokenOneAmount > allowance) {
      setBtnStatus("Approve");
    } else {
      setBtnStatus("Swap");
    }
  };

  useEffect(() => {
    checkBtnStatus();
  }, [tokenOneAmount, tokenTwoAmount, allowance, tokenOne, tokenTwo]);

  const handleSwap = () => {
    const tempToken = tokenOne;
    setTokenOne(tokenTwo);
    setTokenTwo(tempToken);

    if (enteredIn === "token1") {
      setEnteredIn("token2");
      setTokenTwoAmount(tokenOneAmount);
    } else {
      setEnteredIn("token1");
      setTokenOneAmount(tokenTwoAmount);
    }
  };

  console.log("tokens", tokenOneAmount, tokenTwo);

  const handleTokenConversion = async () => {
    try {
      if (tokenOne && tokenTwo && library) {
        const pair = await getPairAddress(
          tokenOne.address,
          tokenTwo.address,
          library
        );
        const pairExists = isPairExist(pair);
        if (pairExists === true) {
          if (enteredIn === "token1") {
            if (tokenOneAmount) {
              const amount = await getAmounts(
                tokenOneAmount,
                tokenOne.address,
                tokenTwo.address,
                library,
                enteredIn
              );

              if (amount) {
                setTokenTwoAmount(amount);
              } else {
                setTokenTwoAmount("");
                setBtnStatus("Not Enough Liquidity");
                setBtnDisabled(true);
              }
            } else {
              setTokenTwoAmount("");
            }
          } else if (enteredIn === "token2") {
            if (tokenTwoAmount) {
              const amount = await getAmounts(
                tokenTwoAmount,
                tokenOne.address,
                tokenTwo.address,
                library,
                enteredIn
              );
              if (amount) {
                setTokenOneAmount(amount);
              } else {
                setTokenOneAmount("");
                setBtnStatus("Not Enough Liquidity");
                setBtnDisabled(true);
              }
            } else {
              setTokenOneAmount("");
            }
          }
        } else {
          if (enteredIn === "token1") {
            setTokenTwoAmount("");
          } else {
            setTokenOneAmount("");
          }
        }
      }
    } catch (error) {
      console.log("Something gone wrong while converting", error);
    }
  };

  const handleSwapModals = (
    transactionPending,
    transactionSuccess,
    transactionFailed
  ) => {
    if (transactionPending) {
      setPendingModal(true);
      setShowTransactionSubmitted(false);
      setShowTransactionFailed(false);
    } else if (transactionSuccess) {
      setPendingModal(false);
      setShowTransactionSubmitted(true);
      setShowTransactionFailed(false);
    } else if (transactionFailed) {
      setPendingModal(false);
      setShowTransactionSubmitted(false);
      setShowTransactionFailed(true);
    }
  };

  useEffect(() => {
    handleSwapModals(transactionPending, transactionSuccess, transactionFailed);
  }, [transactionPending, transactionSuccess, transactionFailed]);

  useEffect(() => {
    handleTokenConversion();
  }, [enteredIn, tokenOneAmount, tokenTwoAmount, tokenOne, tokenTwo, library]);

  const handleSwapContracts = async () => {
    if (btnStatus === "Approve") {
      const approvalAmount =
        "100000000000000000000000000000000000000000000000000";

      await getTokenApproval(
        account,
        approvalAmount,
        tokenOne.address,
        library,
        dispatch
      );
    } else if (btnStatus === "Swap") {
      const minReceive = handleMinReceive(tokenTwoAmount, slippage);
      const maxSold = handleMaxSold(tokenOneAmount, slippage);

      console.log(
        "amounts param",
        account,
        tokenOneAmount,
        tokenTwoAmount,
        tokenOne.address,
        tokenTwo.address,
        library,
        enteredIn,
        minReceive,
        maxSold,
        deadLine,
        toWei(maxSold.toFixed(18))
      );

      await swapContracts(
        account,
        tokenOneAmount,
        tokenTwoAmount,
        tokenOne.address,
        tokenTwo.address,
        library,
        enteredIn,
        minReceive,
        maxSold,
        deadLine,
        dispatch
      );
    }
  };

  return (
    <>
      <MainLayout>
        <div className="swap-page-wrapper">
          <div className="swap-wrapper">
            <div className="swap-header">
              <div className="swap-header-content">
                <div className="title">Swap</div>
                <div
                  className="setting"
                  onClick={() => setShowSettingModal(!showSettingModal)}
                >
                  <img src="/assets/images/settings-image.png" alt="" />
                </div>
              </div>
              <div className="" ref={menuRef}>
                {showSettingModal && <SwapSettingModal />}
              </div>
            </div>
            <div className="swap-input-wrapper">
              <div
                className="currency-input-pannel-wrapper"
                // style={{ order: swap ? 2 : 0 }}
                onClick={() => setTokenType("send")}
              >
                <SelectTokenInputPanel
                  setShowSelectTokenModal={setShowSelectTokenModal}
                  token={tokenOne}
                  tokenAmount={tokenOneAmount}
                  setTokenAmount={setTokenOneAmount}
                  tokenType={tokenType}
                  setEnteredIn={setEnteredIn}
                />
              </div>

              <SwapArrow
                // OnClick={() => (swap ? setSwap(false) : setSwap(true))}
                OnClick={() => handleSwap()}
              />
              <div
                className="token-input-pannel-wrapper"
                onClick={() => setTokenType("receive")}
              >
                <SelectTokenInputPanel
                  setShowSelectTokenModal={setShowSelectTokenModal}
                  //   style={{ order: swap ? 0 : 2 }}
                  token={tokenTwo}
                  tokenAmount={tokenTwoAmount}
                  setTokenAmount={setTokenTwoAmount}
                  tokenType={tokenType}
                  setEnteredIn={setEnteredIn}
                />
              </div>
            </div>

            <TokenFeeAccordion
              tokenOne={tokenOne}
              tokenTwo={tokenTwo}
              tokenOneAmount={tokenOneAmount}
              tokenTwoAmount={tokenTwoAmount}
              enteredIn={enteredIn}
            />

            {/* select token btn */}

            {/* {!showSwapBtn ? (
              <div
                className="select-token-btn-InputPanel"
                onClick={() => (
                  setShowSelectTokenModal(true), setShowSwapBtn(true)
                )}
              >
              select-token-btn-InputPanel
              swap-btn-InputPanel
                Select a token
              </div>
            ) : ( */}
            <div
              className={
                btnDisabled
                  ? "select-token-btn-InputPanel"
                  : "swap-btn-InputPanel"
              }
              // onClick={() => handleSwapConfirmation()}
              onClick={handleSwapContracts}
            >
              {btnStatus}
            </div>
            {/* )} */}
          </div>
        </div>
      </MainLayout>
      <SelectTokenModal
        show={showSelectTokenModal}
        onClose={() => setShowSelectTokenModal(false)}
        tokenList={tokenList}
        handleTokenSelect={handleTokenSelectFun}
        selectedToken={tokenType === "send" ? tokenTwo : tokenOne}
      />
      <PendingModal
        show={pendingModal}
        onClose={() => {
          setPendingModal(false);
          dispatch(setTransactionPending(false));
        }}
      />
      <TransactionSubmitted
        show={showTransactionSubmitted}
        onClose={() => {
          setShowTransactionSubmitted(false);
          dispatch(setTransactionSuccess(false));
        }}
      />
      <TransactionFailed
        show={showTransactionFailed}
        onClose={() => {
          setShowTransactionFailed(false);
          dispatch(setTransactionFailed(false));
        }}
      />
    </>
  );
};

export default Swap;
