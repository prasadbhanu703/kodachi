import React from "react";

const CurrencySelect = ({
  setShowModal,
  styles,
  tokenInfo
}) => {
  return (
    <div
      className="currency-select-container"
      style={styles}
      onClick={() => setShowModal(true)}
    >
      <div className="currency-info">
        <img src={tokenInfo.logo} className="currency-logo" alt="" />
        <span className="currency-name">{tokenInfo.symbol}</span>
      </div>

      <img
        src="/assets/images/arrow-down-image.png"
        className="down-arrow"
        alt=""
      />
    </div>
  );
};

export default CurrencySelect;
