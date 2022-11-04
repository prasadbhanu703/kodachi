import { createSlice } from "@reduxjs/toolkit";
import { TransLinkUrl } from "../../../shared/config";

const initialState = {
  newAccount: "null",
  accountLoading: true,
  transactionStatus: "",
  transactionPending: false,
  transactionSuccess: false,
  transactionFailed: false,
  transactionHash: "https://goerli.etherscan.io",
  deadLine : 20,
  slippage: 0.5
};

const userWalletSlice = createSlice({
  name: "web3Wallet",
  initialState,
  reducers: {
    setAccount: (state, { payload }) => {
      state.newAccount = payload;
    },
    setAccountLoading: (state, { payload }) => {
      state.accountLoading = payload;
    },
    setTransactionStatus: (state, { payload }) => {
      state.transactionStatus = payload;
    },
    setTransactionPending: (state, { payload }) => {
      state.transactionPending = payload;
    },
    setTransactionSuccess: (state, { payload }) => {
      state.transactionSuccess = payload;
    },
    setTransactionFailed: (state, { payload }) => {
      state.transactionFailed = payload;
    },
    setTransactionHash: (state, { payload }) => {
      state.transactionHash = payload;
    },
    setDeadLine: (state, { payload }) => {
      state.deadLine = payload;
    },
    setSlippage: (state, { payload }) => {
      state.slippage = payload;
    },
  },
});

export const {
  setAccount,
  setAccountLoading,
  setTransactionStatus,
  setTransactionPending,
  setTransactionSuccess,
  setTransactionFailed,
  setTransactionHash,
  setDeadLine,
  setSlippage
} = userWalletSlice.actions;

const UserWalletReducer = userWalletSlice.reducer;

export default UserWalletReducer;
