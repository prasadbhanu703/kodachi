import { configureStore } from "@reduxjs/toolkit";
import UserWalletReducer from "./slices/userWallet";

const store = configureStore({
    reducer :{
        userWallet : UserWalletReducer
    }
})

export default store