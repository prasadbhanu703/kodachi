import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccountLoading } from "../../logic/redux/slices/userWallet";
import { injected, walletConnect, walletLink } from "./wallet";

const ReConnect = () => {
  const { activate, account, active, chainId } = useWeb3React();
  const dispatch = useDispatch();
  const { accountLoading } = useSelector((state) => state.userWallet);

  const providers = [injected, walletConnect, walletLink];
  let provider;

  if (typeof window !== "undefined") {
    provider = localStorage.getItem("provider");
  }

  const setProvider = (connector) => {
    typeof window !== "undefined" &&
      window.localStorage.setItem("provider", connector);
  };

  const connectWallet = async (connector) => {
    try {
      // dispatch(setAccountLoading(true));
      await activate(providers[connector], () => {
        typeof window !== "undefined" &&
          window.localStorage.removeItem("provider");
      });

      setProvider(connector);
      dispatch(setAccountLoading(false));
    } catch (error) {
      console.log("error while reconnecting", error);
    }
  };
  useEffect(() => {
    if (provider && !account && !active && accountLoading ) {
      connectWallet(provider);
    } else {
      dispatch(setAccountLoading(false));
    }
  }, [provider, account, active, accountLoading]);

  return null;
};

export default ReConnect;
