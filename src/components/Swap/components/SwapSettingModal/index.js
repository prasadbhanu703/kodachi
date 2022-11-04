import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleDeadLine, handleSlippage } from "../../../../shared/helpers/helper";
import Switch from "../../../Switch";

const SwapSettingModal = () => {
  const dispatch = useDispatch();
  const { deadLine, slippage } = useSelector((state) => state.userWallet);
  console.log("deadLine", deadLine)
  return (
    <div className="swap-settingModal-container">
      <div className="settingModal-title">Transaction Settings</div>
      <div className="sub-title">Slippage tolerance ?</div>

      <div className="setting-input-wrapper">
        <div className="left-side">
          <div className="auto-button">Auto</div>
        </div>
        <div className="right-side">
          <div className="input-wrapper">
            <input type="text"
            value={slippage}
            onChange={(e) => handleSlippage(e, dispatch)}
             />
            <div className="symbol">%</div>
          </div>
        </div>
      </div>
      <div className="transaction-deadline">
        <div className="transaction-heading">Transaction deadline ?</div>
        <div className="input-wrapper">
          <input
            type="text"
            value={deadLine}
            onChange={(e) => handleDeadLine(e, dispatch)}
          />

          <span className="minutes">minutes</span>
        </div>
      </div>

      <div className="interface-settings">
        <div className="interface-heading">Interface Settings</div>
        <div className="switch-wrapper">
          <div className="left-side-text">Auto Router API ?</div>
          <div className="right-side-switch">
            <Switch id={1} active={true} />
          </div>
        </div>
        <div className="switch-wrapper">
          <div className="left-side-text">Expert Mode ?</div>
          <div className="right-side-switch">
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapSettingModal;
