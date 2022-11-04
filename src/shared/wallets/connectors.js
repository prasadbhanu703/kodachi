import { injected, walletConnect, walletLink } from "./wallet";
import MetamaskIcon from "../../assets/icons/metaMask.svg";
import WalletConnectIcon from "../../assets/icons/walletConnect.svg";
import CoinBaseIcon from "../../assets/icons/coinBase.svg";

export const connectors = [
  {
    icon: MetamaskIcon,
    walletName: "Metamask",
    description: "Popular",
    connector: injected,
  },
  {
    icon: WalletConnectIcon,
    walletName: "WalletConnect",
    connector: walletConnect,
  },
  {
    icon: CoinBaseIcon,
    walletName: "Coinbase",
    connector: walletLink,
  },
];
