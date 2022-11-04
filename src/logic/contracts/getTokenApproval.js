import { Router_Contract, TransLinkUrl } from "../../shared/config";
import { convertToEth } from "../../shared/helpers/helper";
import TokenAbi from "../contracts/abis/ERC20Abi.json";
import {
  setTransactionFailed,
  setTransactionHash,
  setTransactionPending,
  setTransactionStatus,
  setTransactionSuccess,
} from "../redux/slices/userWallet";

export const getTokenApproval = async (
  account,
  approvalAmount,
  tokenAddress,
  library,
  dispatch
) => {
  try {
    dispatch(setTransactionStatus("Approve"));
    dispatch(setTransactionPending(true));
    dispatch(setTransactionSuccess(false));
    dispatch(setTransactionFailed(false));

    const contractInstance = new library.eth.Contract(TokenAbi, tokenAddress);
    const gasLimit = await contractInstance.methods
      .approve(Router_Contract, approvalAmount + 10)
      .estimateGas({
        from: account,
      });
    const balance = await contractInstance.methods
      .approve(Router_Contract, approvalAmount + 10)
      .send({
        from: account,
        gas: gasLimit + 1000,
      })
      .once("transactionHash", function (res) {
        if (!!res && typeof res) {
          const transLink = `${TransLinkUrl}${res}`;
          dispatch(setTransactionHash(transLink))
        }
      })
      .once("confirmation", function (confNumber, receipt) {
        if (receipt && typeof receipt !== "undefined") {
            console.log("receipt", receipt)
          dispatch(setTransactionPending(false));
          dispatch(setTransactionSuccess(true));
          dispatch(setTransactionFailed(false));
        }
      })
      .on("error", function (error) {
        dispatch(setTransactionPending(false));
        dispatch(setTransactionSuccess(false));
        dispatch(setTransactionFailed(true));
      });
    const decimals = await contractInstance.methods.decimals().call();
    return convertToEth(balance, decimals);
  } catch (error) {
    console.log("error in getting Balance", error);
    dispatch(setTransactionPending(false));
    dispatch(setTransactionSuccess(false));
    dispatch(setTransactionFailed(true));
  }
};
