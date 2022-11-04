import { Router_Contract } from "../../shared/config";
import { convertToEth } from "../../shared/helpers/helper";
import TokenAbi from "../contracts/abis/ERC20Abi.json";

export const getAllowance = async (account, tokenAddress, library) => {
  try {
    const contractInstance = new library.eth.Contract(TokenAbi, tokenAddress);
    const allowance = await contractInstance.methods.allowance(account, Router_Contract).call();
    const decimals = await contractInstance.methods.decimals().call();
    return convertToEth(allowance, decimals);
  } catch (error) {
    console.log("error in getting Allowance", error);
  }
};
