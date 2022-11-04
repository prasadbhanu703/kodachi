import React, { useState } from "react";
import MainLayout from "../components/MainLayout";

export default function Staking() {
  const [activebtn, setActivebtn] = useState(0);

  const [showStakeModal, setShowStakeModal] = useState(false);
  const [showUnStakeModal, setShowUnStakeModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const StakeClickHandler = (activebtn) => {
    setActivebtn(activebtn);

    setShowStakeModal(true);
  };
  const UnStakeClickHandler = (activebtn) => {
    setActivebtn(activebtn);

    setShowUnStakeModal(true);
  };
  const ClaimClickHandler = (activebtn) => {
    setActivebtn(activebtn);

    setShowClaimModal(true);
  };
  return (
    <MainLayout>
      <div className="staking-page-wrapper">
        <div className="heading-container">
          <div>Token Staking</div>
          <div>6 month Staking Lock</div>
        </div>
        <div className="main-container">
          <div className="main-container__top">
            <span>Staked Tokens</span>
            <span>Earned Tokens</span>
            <span>APY</span>
          </div>
          <div className="main-container__mid">
            <span>0.000000</span>
            <span>0.000000</span>
            <span>125%</span>
          </div>
          <div className="main-container__bottom">
            <div
              className={activebtn === 0 ? "btn active" : "btn"}
              onClick={() => StakeClickHandler(0)}
            >
              Stake
            </div>
            <div
              className={activebtn === 1 ? "btn active" : "btn"}
              onClick={() => UnStakeClickHandler(1)}
            >
              Unstake
            </div>
            <div
              className={activebtn === 2 ? "btn active" : "btn"}
              onClick={() => ClaimClickHandler(2)}
            >
              Claim
            </div>
          </div>
        </div>
        {
          <StakeModal
            show={showStakeModal}
            CancelOnClick={() => setShowStakeModal(false)}
            title={"Stake"}
          />
        }
        {
          <StakeModal
            show={showUnStakeModal}
            CancelOnClick={() => setShowUnStakeModal(false)}
            title={"UnStake"}
          />
        }
        {
          <StakeModal
            show={showClaimModal}
            CancelOnClick={() => setShowClaimModal(false)}
            title={"Claim"}
          />
        }
      </div>
    </MainLayout>
  );
}

function StakeModal({ show, CancelOnClick = () => {}, title }) {
  return (
    show && (
      <div className="stake-modal">
        <div className="stake-modal__top">{title} KODACHI Tokens</div>
        <div className="stake-modal__mid">
          <div className="stake-modal__mid__card">
            {title === "Claim" ? (
              <div className="card__top">
                <span>Claimable Token</span>
              </div>
            ) : (
              <div className="card__top">
                <span>{title}</span>
                <span>Kodachi Balance: 0</span>
              </div>
            )}

            <div className="card__main">
              <span>0.00</span>
              {title === "Claim" ? "" : <span className="btn">MAX</span>}
            </div>
          </div>
          <div className="stake-modal__mid__btn-container">
            <div className="btn">{title}</div>
            <div className="btn" onClick={CancelOnClick}>
              Cancel
            </div>
          </div>
        </div>
        <div className="stake-modal__bottom">
          <div>Get KODACHI Tokens</div>
          <img src="./assets/svg/arrow.svg" alt="" />
        </div>
      </div>
    )
  );
}
