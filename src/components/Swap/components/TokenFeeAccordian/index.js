import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  handleDecimals,
  handleMaxSold,
  handleMinReceive,
} from "../../../../shared/helpers/helper";
import ToolTip from "../../../Tooltip";

const TokenFeeAccordion = ({
  tokenOne,
  tokenTwo,
  tokenOneAmount,
  tokenTwoAmount,
  enteredIn,
}) => {
  const { slippage } = useSelector((state) => state.userWallet);
  const [isActive, setIsActive] = useState(false);
  const [tokenTwoWorth, setTokenTwoWorth] = useState("0.00");

  const worthOfTokenTwo = (tokenOneAmount, tokenTwoAmount) => {
    if (tokenOneAmount && tokenTwoAmount) {
      const result = parseFloat(tokenOneAmount) / parseFloat(tokenTwoAmount);
      setTokenTwoWorth(result);
    }
  };

  useEffect(() => {
    worthOfTokenTwo(tokenOneAmount, tokenTwoAmount);
  }, [tokenOneAmount, tokenTwoAmount]);

  return (
    <div className="token-fee-accordion-container">
      <div className="accordion-wrapper">
        <div
          className="accordion-title-wrapper"
          onClick={() => setIsActive(!isActive)}
        >
          <div className="accordion-title">
            Token Transfer Fee ={" "}
            {tokenOneAmount
              ? handleDecimals(parseFloat(tokenOneAmount) * (10 / 100))
              : "0.00"}{" "}
            ETH
          </div>
          <div className="accordion-arrow">
            <img
              src="/assets/images/arrow-down-sign-to-navigate.png"
              className={`${isActive ? "arrow-down" : "arrow-up"}`}
              alt=""
            />
          </div>
        </div>

        {isActive && tokenOne && tokenTwo && (
          <div className="accordion-content">
            <ToolTip
              content={
                <>
                  <div className="accordion-value-info-hover-wrapper">
                    <div className="accordion-info-inner">
                      <div className="accordion-info-text-wrapper">
                        <div className="accordion-left-text">
                          Expected output
                        </div>
                        <div className="accordion-right-text">
                          {handleDecimals(tokenTwoAmount)} {tokenTwo.symbol}
                        </div>
                      </div>
                      <div className="accordion-info-text-wrapper">
                        <div className="accordion-left-text">Price Impact</div>
                        <div className="accordion-right-text">0.13%</div>
                      </div>
                      <div className="seperator-line"></div>
                    </div>
                    <div className="accordion-info-inner-bottom">
                      <div className="accordion-info-text-wrapper">
                        <div className="accordion-left-text">
                          {enteredIn === "token1"
                            ? "Minimum received after"
                            : "Maximum sold after"}
                        </div>
                        <div className="accordion-right-text">
                          {enteredIn === "token1"
                            ? tokenTwoAmount
                              ? handleDecimals(
                                  handleMinReceive(tokenTwoAmount, slippage)
                                )
                              : "0.00"
                            : tokenOneAmount
                            ? handleDecimals(
                                handleMaxSold(tokenOneAmount, slippage)
                              )
                            : "0.00"}
                        </div>
                      </div>
                      <div className="accordion-info-text-wrapper">
                        <div className="accordion-left-text">
                          slippage ({slippage}%)
                        </div>
                        <div className="accordion-right-text">
                          {tokenOne.symbol}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
              direction="left"
              delay="0"
            >
              <img src="/assets/images/info.png" className="info-icon" alt="" />
            </ToolTip>
            <span>
              {" "}
              1 {tokenTwo.symbol} ={" "}
              {parseFloat(tokenTwoWorth) > 0
                ? handleDecimals(tokenTwoWorth, 8)
                : "0.00"}{" "}
              {tokenOne.symbol}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenFeeAccordion;
