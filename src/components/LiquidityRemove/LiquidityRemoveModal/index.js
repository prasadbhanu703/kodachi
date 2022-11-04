import React from "react";
import ModalContainer from "../../Modal";

const LiquidityRemoveModal = ({ show, onClose }) => {
  return (
    <>
      <ModalContainer
        show={show}
        closeFunction={onClose}
        maxHeightAllocated={900}
        maxWidthAllocated={418}
        borderRadius={43}
        modalBg={"#191B1F"}
        showCloseBtn={false}
      >
        <div className="remove-modal-container">
          <div className="top-side">
            <div>
              <img onClick={onClose} src="./assets/images/back-arrow.png"></img>
            </div>
            <div className="top-text">Remove Liquidity</div>
            <div>
              <img
                className="settings-icon"
                src="./assets/images/settings-image.png"
              ></img>
            </div>
          </div>
          <div className="tip-text">
            Tip: Removing pool tokens converts your position back into
            underlying tokens at the current rate, proportional to your share of
            the pool. Accrued fees are included in the amounts you receive.
          </div>
          <div className="remove-account-count">
            <div className="remove-account-top-text">
              <div>Remove Account</div>
              <div className="sub-heading">Detailed</div>
            </div>
            <div className="heading-count">28%</div>
            <div className="horizontal-line"></div>
            <div className="percentage-box-wrapper">
              <div className="percentage-box">25%</div>
              <div className="percentage-box">50%</div>
              <div className="percentage-box">75%</div>
              <div className="percentage-box">MAX</div>
            </div>
          </div>
          <div className="remove-account-lower">
            <div className="down-arrow">
              <img src="/assets/images/down-arrow.png"></img>
            </div>
            <div className="bitcoin-wrapper">
              <div className="kod-coin">
                <div>0.0423088</div>
                <div className="kod-coin-icon">
                  <img src="/assets/images/dragon_icon.png"></img>KOD
                </div>
              </div>
              <div className="eth-coin">
                <div>0.0280649</div>
                <div className="eth-coin-icon">
                  <img src="/assets/images/ethereum.png"></img>ETH
                </div>
              </div>
              <div className="receive-weth">Receive WETH</div>
            </div>
            <div className="price-wrapper">
              <div className="price-top">
                <div>Price:</div>
                <div>1 KOD = 0.663335 ETH</div>
              </div>
              <div className="price-down">1 ETH = 1.50753 KOD</div>
            </div>
            <div className="lower-btn-wrapper">
          <div className="btn-approve">Approve</div>
          <div className="btn-remove">Remove</div>
        </div>
          </div>
        </div>
      </ModalContainer>
      <div className="">hey</div>
    </>
  );
};

export default LiquidityRemoveModal;

{
  /* <div className="" onClick={onClose} >back</div> */
}

{
  /* <div className="LiquidityRemoveModal-container">
        <div className="LiquidityRemoveModal-container-wrapper">
          <div className="top">
            <div>
              <img
                src="./assets/images/back-arrow.png"
                alt=""
                onClick={onClose}
              />
            </div>
            <div className="top__text">Add Liquidity</div>
            <div>
              <img
                src="./assets/images/settings-image.png"
                className="settings-logo"
                alt=""
              />
            </div>
          </div>
          </div>
        </div> */
}
