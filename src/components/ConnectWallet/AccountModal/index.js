import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import ModalContainer from "../../Modal";
import {
  copyToClipboard,
  shortenAddress,
} from "../../../shared/helpers/helper";
import { connectors } from "../../../shared/wallets/connectors";

const AccountModal = ({ show, onClose }) => {
  const { account, deactivate } = useWeb3React();
  const [copied, setCopied] = useState(false);

  let provider;

  if (typeof window !== "undefined") {
    provider = localStorage.getItem("provider");
  }
  const disconnectWallet = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.clear();
      }
      deactivate();
      onClose();
    } catch (error) {
      console.log("error from disconnec wallet", error);
    }
  };
  const copyAddress = (address) => {
    copyToClipboard(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <ModalContainer
      show={show}
      closeFunction={onClose}
      maxHeightAllocated={550}
      maxWidthAllocated={636}
      borderRadius={43}
    >
      <div className="account-modal-container">
        <div className="account-modal-wrapper">
          <div className="account-modal-top">
            <div className="account-modal-title">Account</div>
            <div className="account-modal-top-card-wrapper">
              <div className="card-header">
                <div className="left-side-text">
                  Connected with {connectors[provider]?.walletName}
                </div>
                <div className="right-side-btn">
                  <div className="disconnect-btn" onClick={disconnectWallet}>
                    <span>Disconnect</span>
                  </div>
                  <div className="change-btn">
                    <span>Change</span>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <img
                  src={connectors[provider]?.icon}
                  className="pie-graph"
                  alt=""
                />
                <div className="card-no">
                  {account ? shortenAddress(account) : "Loading..."}
                </div>
              </div>
              <div className="card-footer">
                <div
                  className="copy-address"
                  onClick={() => copyAddress(account)}
                >
                  <img
                    src={
                      copied
                        ? "/assets/images/check-list.png"
                        : "/assets/images/copy.png"
                    }
                    className="copy-icon"
                    alt=""
                  />
                  <span> {copied ? "Copied" : "Copy Address"} </span>
                </div>
                <div className="view-on-explore">
                  <img
                    src="/assets/images/share.png"
                    className="share-icon"
                    alt=""
                  />
                  <span>View on Explorer</span>
                </div>
              </div>
            </div>
          </div>
          <div className="account-modal-bottom">
            <div className="account-transaction-wrapper">
              <div className="transaction-heading">
                <div className="transaction-title">Recent Transactions</div>
                <div className="transaction-subtitle">(clear all)</div>
              </div>
              <div className="transaction-history-wrapper">
                <div className="transaction-history">
                  <div className="transaction-name">
                    <span> Add 0.1ETH and 0.151 KOD to kodachiswap </span>
                    <img
                      src="/assets/images/Arrow.png"
                      className="up-arrow"
                      alt=""
                    />
                  </div>
                  <div className="checklist">
                    <img
                      src="/assets/images/check-list.png"
                      className="check-list-icon"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="transaction-history-wrapper">
                <div className="transaction-history">
                  <div className="transaction-name">
                    <span> Approve KOD</span>
                    <img
                      src="/assets/images/Arrow.png"
                      className="up-arrow"
                      alt=""
                    />
                  </div>
                  <div className="checklist">
                    <img
                      src="/assets/images/check-list.png"
                      className="check-list-icon"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="transaction-history-wrapper">
                <div className="transaction-history">
                  <div className="transaction-name">
                    <span> Swap exactly 0.1ETH for 0.151103 KOD</span>
                    <img
                      src="/assets/images/Arrow.png"
                      className="up-arrow"
                      alt=""
                    />
                  </div>
                  <div className="checklist">
                    <img
                      src="/assets/images/check-list.png"
                      className="check-list-icon"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default AccountModal;
