import React from "react";
import { useSelector } from "react-redux";
import ModalContainer from "../../../../Modal";

const TransactionSubmitted = ({ show, onClose }) => {
  const { transactionHash } = useSelector((state) => state.userWallet);
  return (
    <ModalContainer
      show={show}
      closeFunction={onClose}
      maxHeightAllocated={500}
      // maxHeightAllocated={10}
    >
      <div className="transaction-submitted-container">
        <div className="transaction-submitted-inner">
          <div className="upload-img">
            <img
              src="/assets/images/upload.png"
              className="upload-icon"
              alt=""
            />
          </div>
          <div className="upload-info-wrapper">
            <div className="upload-text">Transaction Submitted</div>
            <a
              className="view-onexploare"
              href={transactionHash}
              target="_blank"
              rel="noreferrer"
            >
              View on Explorer
            </a>
            <div className="add-kod-btn">Add KOD</div>
            <div className="transaction-close-btn" onClick={onClose}>
              Close
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default TransactionSubmitted;
