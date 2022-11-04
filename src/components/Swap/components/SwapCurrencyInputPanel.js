import React, { useState } from "react";
import CurrencySelect from "../../CurrencySelect";
import { Input } from "../../Input";

const SwapCurrencyInputPanel = ({
  setShowSelectTokenModal,
  getSwapBtnAction,
}) => {
  // temperoray added logic please make changes accordingly

  const [inputState, setInputState] = useState({
    currency: "",
  });

  // const [showSwapbtn, setShowSwapbtn] = useState(inputState?.currency)

  // getSwapBtnAction(showSwapbtn)

  const updateInputField = (event) => {
    setInputState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // console.log(inputState);
  return (
    <div className="Input-panel-wrapper">
      <div className="container">
        <div className="Input-row">
          <div className="StyledNumericalInput">
            <Input
              placeholder={0}
              name="currency"
              required={true}
              value={inputState?.currency}
              onChange={updateInputField}
            />
            {/* <input type="text" /> */}
          </div>
          <div className="currency-btn">
            <CurrencySelect
              setShowModal={setShowSelectTokenModal}
            //   tokenInfo={token}
              styles={{ backgroundColor: "#293249" }}
            />
          </div>
        </div>
        <div className="show-balance">
          <span>Balance:</span> <span> 20.90000</span>{" "}
          <span className="max-button"> Max</span>
        </div>
      </div>
    </div>
  );
};

export default SwapCurrencyInputPanel;
