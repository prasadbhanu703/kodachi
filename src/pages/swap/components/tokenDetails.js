import { getBalance } from "../../../logic/contracts/getBalance";
import { getTokenBalance } from "../../../logic/contracts/tokenBalance";
import { TK1_Address, TK2_Address, WETH_Address } from "../../../shared/config";
import ETH_Logo from "../../../assets/icons/Eth.svg";
import WETH_Logo from "../../../assets/icons/WETH.svg";
import KOD_Logo from "../../../assets/icons/KOD.svg";

export const TokenDetails = [
  {
    symbol: "ETH",
    name: "Ether",
    address: WETH_Address,
    logo: ETH_Logo,
    balance: "0.00",
  },
  {
    symbol: "WETH",
    name: "Wrapped Ether",
    address: WETH_Address,
    logo: WETH_Logo,
    balance: "0.00",
  },
  {
    symbol: "KOD1",
    name: "Kodachi Swap",
    address: TK1_Address,
    logo: KOD_Logo,
    balance: "0.00",
  },
  {
    symbol: "KOD2",
    name: "Kodachi Swap",
    address: TK2_Address,
    logo: KOD_Logo,
    balance: "0.00",
  },
];

export const returnTokenList = async (tokenDataList, account, library) => {
  let tokenData = [];

  await Promise.all(
    tokenDataList.map(async (element) => {
      let tokenStatus;

      if (element.symbol === "ETH") {
        tokenStatus = await getBalance(library, account);
      } else
        tokenStatus = await getTokenBalance(account, element.address, library);

      element.balance = tokenStatus;

      tokenData.push(element);
    })
  );
  // console.log("tokenStatus =>>>" ,tokenData)
  // result = tokenData;
  return tokenData;
};
