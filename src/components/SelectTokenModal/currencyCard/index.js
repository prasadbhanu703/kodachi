import React from "react";
import { handleDecimals } from "../../../shared/helpers/helper";

const CurrencyCard = ({ tokenInfo }) => {
    
  return (
    <div className="currency-card-container">
      <div className="currency-card-wrapper">
        <div className="left-container">
          <div className="currency-icon">
            <img src={tokenInfo.logo} alt="" />
          </div>
          <div className="currency-info">
            <span className="currency-name">{tokenInfo.name}</span>
            <div className="small-name">{tokenInfo.symbol}</div>
          </div>
        </div>
        <div className="right-container">
          {handleDecimals(tokenInfo.balance)}
        </div>
      </div>
    </div>
  );
};

export default CurrencyCard;
