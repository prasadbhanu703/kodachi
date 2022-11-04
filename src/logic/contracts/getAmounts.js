import { Router_Contract } from "../../shared/config";
import { convertToEth, convertToWei } from "../../shared/helpers/helper";
import RouterAbi from "../contracts/abis/routerAbi.json";

export const getAmounts = async (
  enteredAmount,
  tokenOne,
  tokenTwo,
  library,
  enteredIn
) => {
  try {
    console.log(
      "amounts param",
      enteredAmount,
      tokenOne,
      tokenTwo,
      library,
      enteredIn
    );
    const amountInWei = convertToWei(enteredAmount, 18)
    const contractInstance = new library.eth.Contract(
      RouterAbi,
      Router_Contract
    );
    const pair = [tokenOne, tokenTwo];
    let finalAmount;
    if (enteredIn === "token1") {
      const amount = await contractInstance.methods
        .getAmountsOut(amountInWei, pair)
        .call();
      finalAmount = amount[1];
    } else if (enteredIn === "token2") {
      const amount = await contractInstance.methods
        .getAmountsIn(amountInWei, pair)
        .call();
      finalAmount = amount[0];
    }
    console.log(
      "amount",
      contractInstance,
      pair,
      finalAmount,
      convertToEth(parseFloat(finalAmount), 18)
    );
    return convertToEth(finalAmount, 18);
  } catch (error) {
    console.log("error while getting amounts", error);
  }
};
