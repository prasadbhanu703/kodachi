import { Factory_Contract } from "../../shared/config";
import FactoryAbi from "../contracts/abis/factoryAbi.json";

export const getPairAddress = async (tokenOne, tokenTwo , library) => {
  try {
    const contractInstance = new library.eth.Contract(FactoryAbi, Factory_Contract);
    const pairAddress = await contractInstance.methods.getPair(tokenOne, tokenTwo).call();
    return pairAddress;
  } catch (error) {
    console.log("error while getting pair address", error);
  }
};
