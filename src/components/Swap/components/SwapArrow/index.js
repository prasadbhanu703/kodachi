import React from 'react'

const SwapArrow = ({OnClick=()=>{}}) => {
    return (
        <div className="swap-arrow-wrapper" onClick={OnClick}>
            <div className="swap-arrow-inner">
                <img src="/assets/svg/swap/swap-arrow.svg" alt="" />
            </div>
        </div>
    )
}

export default SwapArrow;