import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBalance } from "../../logic/contracts/getBalance";
import { getDollarValue } from "../../logic/helpers/getDollarValue";
import { handleDecimals, numberToHex, shortenAddress } from "../../shared/helpers/helper";
import { connectors } from "../../shared/wallets/connectors";
import { networkParams } from "../../shared/wallets/networks";
import ConnectWallet from "../ConnectWallet";
import AccountModal from "../ConnectWallet/AccountModal";
import { toHex } from "web3-utils";

const HeaderNavbar = () => {
  const { account, chainId, library, deactivate } = useWeb3React();
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [walletModal, setWalletModal] = useState("connect");
  const { accountLoading } = useSelector((state) => state.userWallet);
  const [balance, setBalance] = useState("0.00");

  let provider;

  if (typeof window !== "undefined") {
    provider = localStorage.getItem("provider");
  }

  const getEthBalance = async () => {
    const bal = await getBalance(library, account);
    const dollar = await getDollarValue();
    const balanceInDollar = parseFloat(bal) * parseFloat(dollar);
    setBalance(balanceInDollar);
  };

  useEffect(() => {
    if (account && library) {
      getEthBalance();
    }
  }, [account, library, accountLoading]);

  const switchNetwork = async () => {
    try {
      deactivate();
      // setShowConnectWallet(false)
      // setLoader(true)
      await library.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(5) }],
      });
      // callback && callback()
      // setLoader(false)
    } catch (switchError) {
      console.log("switchError", switchError);
      if (switchError.code === 4902) {
        try {
          await library.currentProvider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[5]],
          });
          // callback && callback()
          // setLoader(false)
        } catch (error) {
          // setLoader(false)
          console.error(error);
        }
      }
    }
  };

  useEffect(() => {
    if (account && chainId !== 5) {
      switchNetwork();
    }
  }, [account, chainId]);

  return (
    <div className="header-navbar-container">
      <div className="header-navbar-wrapper">
        <div className="logo-container">
          <img src="/assets/images/logo.png" className="logo" alt="" />
          <img
            src="/assets/images/logo-name.png"
            className="logo-name"
            alt=""
          />
        </div>
        <div className="connect-wallet-container">
          <div className="crypto-price">
            <img src="/assets/svg/dragon.svg" className="Dragon-img" alt="" />
            <div className="amount">
              {account
                ? accountLoading
                  ? "Loading..."
                  : " $ " + handleDecimals(balance, 8)
                : " $ 0.00"}
            </div>
          </div>
          <div
            className="connect-wallet-btn"
            onClick={() => {
              setShowConnectWallet(true);
              if (account) {
                setWalletModal("disconnect");
              } else {
                setWalletModal("connect");
              }
            }}
          >
            <span className="crypto-Id">
              {" "}
              {accountLoading
                ? "Loading..."
                : account
                ? shortenAddress(account)
                : "Connect Wallet"}{" "}
            </span>
            {account && provider && (
              <div className="crypto-icon">
                <img src={connectors[provider].icon} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
      {walletModal === "connect" ? (
        <ConnectWallet
          show={showConnectWallet}
          onClose={() => setShowConnectWallet(false)}
        />
      ) : (
        <AccountModal
          show={showConnectWallet}
          onClose={() => setShowConnectWallet(false)}
        />
      )}
    </div>
  );
};

export default HeaderNavbar;
