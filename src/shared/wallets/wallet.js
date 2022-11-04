import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const supportedChainIds = [1, 4, 80001, 137, 43114, 56, 250, 42161, 10, 42, 5];

export const RPC_URLS = {
  5: "https://rpc.goerli.mudit.blog/",
};

const POLLING_INTERVAL = 8000;

export const walletConnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  supportedChainIds: supportedChainIds,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  qrcodeModalOptions: {
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ],
  },
  pollingInterval: POLLING_INTERVAL,
});

export const injected = new InjectedConnector({
  supportedChainIds: supportedChainIds,
});

const activateInjectedProvider = (providerName) => {
  if (typeof window !== "undefined") {
    const { ethereum } = window;

    if (!ethereum?.providers) {
      return undefined;
    }

    let provider;
    switch (providerName) {
      case "CoinBase":
        provider = ethereum.providers.find(
          ({ isCoinbaseWallet }) => isCoinbaseWallet
        );
        break;
      case "MetaMask":
        provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
        break;
      default:
        provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
        break;
    }

    if (provider) {
      ethereum.setSelectedProvider(provider);
    }
  }
};

if (typeof window !== "undefined") {
  activateInjectedProvider("MetaMask");
}

export const walletLink = new WalletLinkConnector({
  url: RPC_URLS.ETHEREUM_RPC_NODE_URL,
  appName: "Kodachiswap",
  supportedChainIds: supportedChainIds,
});
