import { convertToEth } from "../../shared/helpers/helper";

export const getBalance = async (library, userAddress) => {
  try {
    const balance = await library.eth.getBalance(userAddress);
    const balanceInEth = convertToEth(balance, 18);
    return balanceInEth;
  } catch (error) {
    console.log("error in getting Balance", error);
  }
};
