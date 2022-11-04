import React from "react";
import ModalContainer from "../Modal";
import WalletCard from "./WalletCard";

const ConnectWallet = ({ show, onClose }) => {
  return (
    <ModalContainer
      show={show}
      closeFunction={onClose}
      maxHeightAllocated={380}
      maxWidthAllocated={480} 
      borderRadius={63}
      modalBg={"#000000"}
      // maxHeightAllocated={10}
    >
      <div className="connectWallet-container">
        <div className="connectWallet-heading">Connect a wallet</div>

        <div className="wallet-card-wrapper">
          <WalletCard closePrevModal={onClose} />
        </div>
        <div className="walletCard-terms">
          <div className="terms-text">
            By connecting a wallet, you agree to Kodachiswap Lab’s{" "}
            <span className="terms-link">Terms of Service</span> and acknowledge
            that you have read and understand the Kodachiswap{" "}
            <span className="terms-link">Protocol Disclaimer</span>.
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ConnectWallet;
