import Web3 from "web3";

export const web3 = new Web3(
  Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545/"
);
