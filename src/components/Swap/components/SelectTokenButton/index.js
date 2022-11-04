import React from 'react'

const SelectTokenButton = ({ setShowSelectTokenModal }) => {
    return (
        <div className="token-select-btn-container" onClick={() => setShowSelectTokenModal(true)} >
            <div className="token-select-wrapper" >
                <div className="token-btn-wrapper">
                    <div className="token-btn-name" >Select token</div>
                </div>
                <div className="down-arrow-wrapper">
                    <img src="/assets/images/arrow-down-image.png" className="down-arrow" alt="" />
                </div>
            </div>
        </div>
    )
}

export default SelectTokenButton;