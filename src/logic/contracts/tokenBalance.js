import { convertToEth } from "../../shared/helpers/helper";
import TokenAbi from "../contracts/abis/ERC20Abi.json";

export const getTokenBalance = async (account, tokenAddress, library) => {
  try {
    const contractInstance = new library.eth.Contract(TokenAbi, tokenAddress);
    const balance = await contractInstance.methods.balanceOf(account).call();
    const decimals = await contractInstance.methods.decimals().call();
    return convertToEth(balance, decimals);
  } catch (error) {
    console.log("error in getting Balance", error);
  }
};
