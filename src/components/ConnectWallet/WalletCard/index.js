import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";

import AccountModal from "../AccountModal";
import { walletConnect } from "../../../shared/wallets/wallet";
import { connectors } from "../../../shared/wallets/connectors";
import { useDispatch, useSelector } from "react-redux";

const WalletCard = ({ closePrevModal }) => {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const { account, chainId, activate, deactivate } = useWeb3React();
  const dispatch = useDispatch();
  const { setAccountLoading } = useSelector((state) => state.userWallet);
  const setProvider = (connectorId) => {
    typeof window !== "undefined" &&
      window.localStorage.setItem("provider", connectorId);
  };

  const connectWallet = async (connector, connectorId) => {
    try {
      if (!account) {
        await activate(connector, () => {
          typeof window !== "undefined" &&
            window.localStorage.removeItem("provider");
        });

        setProvider(connectorId);
        if (connector === walletConnect && !connector.walletConnectProvider) {
          setShowAccountModal(false);
        } else {
          setShowAccountModal(true);
        }
        // closePrevModal();
        dispatch(setAccountLoading(false));
      } else {
        deactivate();
        // closePrevModal();
      }

    } catch (error) {
      console.log("Error while connecting", error);
    }
  };
  return (
    <>
      <div className="walletCard-container">
        {connectors.map((wallet, idx) => {
          return (
            <div
              className="walletCard-inner"
              onClick={() => {
                connectWallet(wallet.connector, idx);
              }}
              key={idx}
            >
              <div className="brand-logo-wrapper">
                <img src={wallet.icon} className="brand-logo" alt="" />
              </div>
              <div className="brand-name">{wallet.walletName}</div>
            </div>
          );
        })}
        {/* <div className="walletCard-inner">
                    <div className="brand-logo-wrapper">
                        <img src="/assets/images/MetaMask.png" className="brand-logo" alt="" />
                    </div>
                    <div className="brand-name" onClick={() => setShowAccountModal(true)} >
                        MetaMask
                    </div>
                </div>
                <div className="walletCard-inner">
                    <div className="brand-logo-wrapper">
                        <img src="/assets/images/coinbaseWalletIcon.png" className="brand-logo" alt="" />
                    </div>
                    <div className="brand-name" onClick={() => setShowAccountModal(true)}  >
                        Coinbase Wallet
                    </div>
                </div>
                <div className="walletCard-inner" onClick={() => setShowAccountModal(true)}  >
                    <div className="brand-logo-wrapper">
                        <img src="/assets/images/walletConnectIcon.png" className="brand-logo" alt="" />
                    </div>
                    <div className="brand-name">
                        WalletConnect
                    </div>
                </div> */}
      </div>
      {console.log("account", account, chainId)}
      {account && chainId === 5 && (
        <AccountModal
          show={showAccountModal}
          onClose={() => {
            setShowAccountModal(false);
            closePrevModal();
          }}
        />
      )}
    </>
  );
};

export default WalletCard;
