import React, { useState } from "react";
import LiquidityRemoveModal from "../LiquidityRemoveModal";

const LpRemoveDropdown = () => {
  const [showRemoveLp, setShowRemoveLp] = useState(false)
  return (
    <>
      <div className="dropdown-container">
        <div className="dropdown-container-wrapper">
          <div className="raw-data">
            <div className="dropdown-left-data">Your tool pool tokens</div>
            <div className="dropdown-right-data">0.1197</div>
          </div>
          <div className="raw-data">
            <div className="dropdown-left-data">Pooled KOD:</div>
            <div className="dropdown-right-data">
              0.151103 <img src="/assets/images/dragon_icon.png"></img>
            </div>
          </div>
          <div className="raw-data">
            <div className="dropdown-left-data">Pooled ETH:</div>
            <div className="dropdown-right-data">
              0.100232 <img src="/assets/images/ethereum.png"></img>
            </div>
          </div>
          <div className="raw-data">
            <div className="dropdown-left-data">Your Your pool share:</div>
            <div className="dropdown-right-data">
              <span>{"<"}</span>0.01%
            </div>
          </div>
        </div>
        <div className="btn-wrapper">
          <div className="dropdown-btn">
            view accrued fees and analytics
            <img src="/assets/images/Arrow6.png"></img>
          </div>
        </div>
        <div className="add-remove-btn-wrapper">
          <div className="btn">Add</div>
          <div className="btn" onClick={() => setShowRemoveLp(true)}>Remove</div>
        </div>
      </div>

      <LiquidityRemoveModal
        show={showRemoveLp}
        onClose={() => setShowRemoveLp(false)}
      />
    </>
  );
};

export default LpRemoveDropdown;
