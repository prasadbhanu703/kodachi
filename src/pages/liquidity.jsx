import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import CurrencySelect from "../components/CurrencySelect";
import LpRemoveDropdown from "../components/LiquidityRemove/LpDropdown";
import { TokenDetails } from "./swap/components/tokenDetails";

export default function Liquidity() {
  const [showliquidityModal, setShowliquidityModal] = useState(true);
  const [isActive, setIsActive] = useState(false);
  return (
    <MainLayout>
      <div className="liquidity-page-wrapper">
        {showliquidityModal ? (
          <LiquidityModal setLiquidityModalState={setShowliquidityModal} />
        ) : (
          <div className="liquidity-page-inner-wrapper">
            <div className="top">
              <div className="top__header">Liquidity provider rewards</div>
              <div className="top__mid">
                Liquidity provider earn a 0.3% fee on all trades proportional to
                their share of the pool. Fees are added to the pool, accrue in
                real time and can be claimed by withdrawing your liquidity.
              </div>
              <Link to={""}>
                <div className="top__footer">
                  Read more about providing liquidity.
                </div>
              </Link>
            </div>
            <div className="mid">
              <div className="title">Your Liquidity</div>
              <div className="btn-container">
                <div className="btn">Create a pair</div>
                <div className="btn">Import Pool</div>
                <div
                  className="btn"
                  onClick={() => setShowliquidityModal(true)}
                >
                  Add Liquidity
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="bottom__card-1">
                <div>Account analytics and accrued fees</div>
                <div>
                  <img src="./assets/svg/bluearrow.svg" alt="" />
                </div>
              </div>
              <div
                className="bottom__card-2"
                onClick={() => setIsActive(!isActive)}
              >
                <div className="card-2__left">
                  <img src="./assets/images/kod-eth.png" alt="" />
                  <span>KOD/ETH</span>
                </div>
                <div className="card-2__right">
                  <span>Manage</span>
                  <img
                    className={`${isActive ? "arrow-down" : "arrow-up"}`}
                    src="./assets/images/blue-down-arrow.png"
                    alt=""
                  />
                </div>
              </div>
              {isActive && <LpRemoveDropdown />}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

function LiquidityModal({ setLiquidityModalState }) {
  const [selectedToken, setSelectedToken] = useState("");
  const [ETHCurrency, setETHCurrency] = useState(null);
  const [Currency, setCurrency] = useState(null);
  const [showSupplyModal, setShowSupplyModal] = useState(false);

  return (
    <div className="liquidity-modal">
      <div className="top">
        <div>
          <img
            src="./assets/images/back-arrow.png"
            alt=""
            onClick={() => setLiquidityModalState(false)}
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
      <div className="tip">
        Tip: When you add liquidity, you will receive pool tokens representing
        your position. These tokes automatically earn fees proportional to your
        share of the pool, and can be redeemed at any time.
      </div>
      <div className="mid">
        <div className="input-container">
          <input
            type="number"
            placeholder="0.0"
            onChange={(e) => setETHCurrency(e.target.value)}
          />
          <div className="currency-select-wrapper">
            <CurrencySelect
              tokenInfo={TokenDetails[0]}
              styles={{ backgroundColor: "#2D2F35" }}
            />
            <div className="balance">
              <div>Balance: 5.973</div>
              <div className="max-badge">MAX</div>
            </div>
          </div>
        </div>
        <div className="plus-circle">
          <img src="./assets/images/plus.png" alt="" />
        </div>
        <div className="input-container">
          <input
            type="number"
            placeholder="0.0"
            disabled={selectedToken ? false : true}
            onChange={(e) => setCurrency(e.target.value)}
          />
          {/* use custom select component when it is available */}
          <div className="select-token" onClick={() => setSelectedToken("KOD")}>
            <div>Select a token</div>
            <img src="./assets/images/arrow-down-image.png" alt="" />
          </div>
        </div>
      </div>
      <div className="bottom">
        {selectedToken && (
          <div className="price-container">
            <div className="header">Prices and pool share</div>
            <div className="main">
              <span>1.50753</span>
              <span>0.663335</span>
              <span>0%</span>
              <span>KOD per ETH</span>
              <span>ETH per KOD</span>
              <span>Share of pool</span>
            </div>
          </div>
        )}
        <div
          className={ETHCurrency && Currency !== 0 ? "btn approve-btn" : "btn"}
        >
          {selectedToken === "" ? (
            <span className="invalid-btn">Invalid pair</span>
          ) : ETHCurrency && Currency !== 0 ? (
            "Approve KOD"
          ) : (
            "Enter an amount"
          )}
        </div>
        {ETHCurrency && Currency && (
          <div
            className="btn supply-btn"
            onClick={() => setShowSupplyModal(true)}
          >
            Supply
          </div>
        )}
        {selectedToken && (
          <div className="star-container">
            <img src="./assets/svg/star.svg" alt="" />
            <span>
              By adding liquidity you’ll earn 0.3% of all trades on this pair
              proportional to your share of the pool. Fees are added to the
              pool, accrue in real time and can be claimed by withdrawing your
              liquidity.
            </span>
          </div>
        )}
      </div>
      <SupplyModal
        show={showSupplyModal}
        closeFunction={() => setShowSupplyModal(false)}
      />
    </div>
  );
}

function SupplyModal({ show, closeFunction }) {
  return (
    <Modal show={show} closeFunction={closeFunction}>
      <div className="supply-modal-wrapper">
        <div className="heading">You will receive</div>
        <div className="sub-heading">
          <div className="sub-heading__top">
            0.119726 <img src="./assets/images/kod-eth.png" alt="" />
          </div>
          <div>ETH/KOD Pool Tokens</div>
          <div>
            Output is estimated. If the price changes by more than 30% your
            transaction will revert.
          </div>
        </div>
        <div className="main">
          <div className="main__eth">
            <span>ETH Deposited</span>
            <span>
              <img src="./assets/images/eth.png" alt="" /> 0.100232
            </span>
          </div>
          <div className="main__currency">
            <span>KOD Deposited</span>
            <span>
              <img src="./assets/images/eth.png" alt="" /> 0.100232
            </span>
          </div>
          <div className="main__rates">
            <span>Rates</span>
            <span>
              <div>1 ETH = 1.508 KOD</div>
              <div>1 KOD = 0.6633 ETH</div>
            </span>
          </div>
          <div className="main__share">
            <span>Share of Pool:</span>
            <span>0.0007484%</span>
          </div>
        </div>
        <div className="footer btn">Confirm Supply</div>
      </div>
    </Modal>
  );
}
