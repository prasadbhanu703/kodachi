import { RPC_URLS } from "./wallet";

export const networkParams = {
  "0x5": {
    chainId: "0x5",
    rpcUrls: RPC_URLS[5],
    chainName: "Goerli",
    nativeCurrency: { name: "GoerliETH", decimals: 18, symbol: "GoerliETH" },
    blockExplorerUrls: ["https://goerli.etherscan.io"],
  },
};

export const networkName = {
  1: "Ethereum",
  3: "Ropsten",
  4: "Rinkeby",
  5: "Goerli",
  137: "Polygon",
  80001: "Mumbai",
};
