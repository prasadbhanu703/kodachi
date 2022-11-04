import BigNumber from "bignumber.js";
import { setDeadLine, setSlippage } from "../../logic/redux/slices/userWallet";
import { positiveNumRegex } from "../regex";

export const shortenAddress = (address) => {
  const shortAddr =
    address.toString().slice(0, 6) +
    "...." +
    address.toString().slice(address.length - 5, address.length - 1);
  return shortAddr;
};

export const convertToEth = (balance, decimals) => {
  try {
    const bal = new BigNumber(parseFloat(balance).toFixed(18)).div(Math.pow(10, decimals)).toFixed();
    return bal;
  } catch (error) {
    console.log("error in converting to eth", error);
  }
};

export const convertToWei = (balance, decimals) => {
  try {
    const bal = new BigNumber(parseFloat(balance).toFixed(18))
      .multipliedBy(Math.pow(10, decimals))
      .toFixed();
    return bal;
  } catch (error) {
    console.log("error in converting to eth", error);
  }
};

export const copyToClipboard = async (text) => {
  typeof window !== "undefined" &&
    (await window.navigator.clipboard.writeText(text));
  return;
};

export const handleDecimals = (amount, decimals) => {
  if (amount.toString().includes(".")) {
    return parseFloat(amount).toFixed(decimals ? decimals : 4);
  } else {
    return amount;
  }
};

export const handleDeadLine = (e, dispatch) => {
  const { value } = e.target;
  if (parseFloat(value) <= 100) {
    dispatch(setDeadLine(parseInt(value).toString()));
  } else {
    dispatch(setDeadLine(""));
  }
};

export const handleSlippage = (e, dispatch) => {
  const { value } = e.target;
  if (parseFloat(value) <= 100) {
    dispatch(setSlippage(parseInt(value).toString()));
  } else {
    dispatch(setSlippage(""));
  }
};

export const handleMinReceive = (val, slippage) => {
  if (val) {
    const minReceive =
      parseFloat(val) -
      parseFloat((parseFloat(val) * (Number(slippage) / 100)).toFixed(18));
    return minReceive;
  }
};

export const handleMaxSold = (val, slippage) => {
  if (val) {
    const maxSold = Number(val) + (Number(val) * Number(slippage)) / 100;
    return maxSold;
  }
};
