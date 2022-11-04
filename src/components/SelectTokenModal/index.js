import React, { useState } from "react";
import ModalContainer from "../Modal";
import Search from "../Search";
// import SearchHistory from "../Search/SearchHistory";
import CurrencyCard from "./currencyCard";

const SelectTokenModal = ({
  show,
  onClose,
  tokenList,
  handleTokenSelect,
  selectedToken,
}) => {
  const [tokenDataList, setTokenDataList] = useState(tokenList);
  const selectTokenFun = (token) => {
    if (selectedToken !== token) {
      handleTokenSelect(token);
    }
  };

  const handleTokenChange = async (e) => {
    const value = e.target.value;
    let newTokenList = [];
    if (value) {
      newTokenList = tokenList.filter(
        (e) =>
          e.name.toLowerCase().includes(value.toLowerCase()) ||
          e.address.toLowerCase() === value.toLowerCase()
      );

      setTokenDataList([...newTokenList]);
    } else {
      setTokenDataList([...tokenList]);
    }
  };

  return (
    <ModalContainer
      show={show}
      closeFunction={onClose}
      maxHeightAllocated={550}
      borderRadius={63}
      // maxHeightAllocated={10}
    >
      <div className="select-token-modal-container">
        <div className="modal-name">Select a token</div>
        <div className="modal-header">
          <Search
            placeholder={"Search name or paste address"}
            onChange={handleTokenChange}
          />
          {/* <SearchHistory /> */}

          <div className="seperator-line"></div>
        </div>
        <div className="modal-body">
          {tokenDataList.map((token, idx) => {
            return (
              <div
                onClick={() => selectTokenFun(token)}
                key={idx}
                style={{ opacity: token === selectedToken ? 0.5 : 1 }}
              >
                <CurrencyCard tokenInfo={token} />
              </div>
            );
          })}
        </div>
        {/* <div className="modal-footer">
                    <div className="manage-token-list-btn">
                        <img src="/assets/images/edit.png" alt="" />
                        <span> Manage Token Lists</span>
                    </div>
                </div> */}
      </div>
    </ModalContainer>
  );
};

export default SelectTokenModal;
