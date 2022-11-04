import React, { useEffect, useState } from "react";
import CurrencySelect from "../../../CurrencySelect";
import { Input } from "../../../Input";
import SelectTokenButton from "../SelectTokenButton";
import { handleDecimals } from "../../../../shared/helpers/helper";

const SelectTokenInputPanel = ({
  setShowSelectTokenModal,
  token,
  tokenAmount,
  setTokenAmount,
  tokenType,
  setEnteredIn,
}) => {
  const handleEnteredIn = () => {
    if (tokenType === "send") {
      setEnteredIn("token1");
    } else if (tokenType === "receive") {
      setEnteredIn("token2");
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setTokenAmount(value);
    handleEnteredIn();
  };
  return (
    <div className="select-token-input-panel-wrapper">
      <div className="select-token-input-panel-inner">
        <div className="Input-row">
          <div className="StyledNumericalInput">
            <Input
              placeholder={0}
              name="currency"
              required={true}
              value={tokenAmount}
              onChange={handleInput}
            />
          </div>
          <div className="currency-btn">
            {token ? (
              <CurrencySelect
                setShowModal={setShowSelectTokenModal}
                tokenInfo={token}
                styles={{ backgroundColor: "#293249" }}
              />
            ) : (
              <SelectTokenButton
                setShowSelectTokenModal={setShowSelectTokenModal}
              />
            )}
          </div>
        </div>
        {token && (
          <div className="show-balance">
            <span>Balance:</span> <span> {handleDecimals(token.balance)}</span>{" "}
            <span
              className="max-button"
              onClick={() => {
                setTokenAmount(token.balance);
                handleEnteredIn();
              }}
            >
              {" "}
              Max
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectTokenInputPanel;
