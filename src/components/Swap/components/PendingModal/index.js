import React, { useState } from "react";
import { useSelector } from "react-redux";
import ModalContainer from "../../../Modal";
import ClipLoader from "react-spinners/ClipLoader";

const PendingModal = ({ show, onClose }) => {
  const { transactionStatus } = useSelector((state) => state.userWallet);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#3A70DD");

  return (
    <ModalContainer
      show={show}
      closeFunction={onClose}
      maxHeightAllocated={380}
      // maxHeightAllocated={10}
    >
      <div className="confirm-swap-modal-container">
        <div className="loading-wrapper">
          <div className="loading-inner">
            <ClipLoader
              color={color}
              loading={loading}
              size={90}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
        <div className="loading-info">
          <div className="loading-reason">Waiting For Confirmtion</div>
          {transactionStatus === "Approve" ? (
            <></>
          ) : (
            <div className="loading-info">
              Supplying 0.000041179 KOD and 0.00003 ETH
            </div>
          )}

          <div className="loading-alert">
            Confirm this transaction in your wallet
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default PendingModal;
