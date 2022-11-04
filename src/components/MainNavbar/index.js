import React from 'react'
import { Link } from 'react-router-dom';

const MainNavbar = () => {
    return (
        <div className="main-navbar-container">
            <div className="main-navbar-wrapper">
                {/* <div className="hamburger-wrapper">
                    <img src="/assets/svg/hamburger.svg" alt="" />
                </div> */}
                <div className="nav-links-wrapper">
                <Link to={'/'}>   <div className="links">Swap</div></Link> 
                <Link to={'/liquidity'}>    <div className="links">Liquidity</div></Link>
                <Link to={'/staking'}>      <div className="links">Staking</div></Link>
                 <Link to={'/nft-staking'}>   <div className="links">NFT Staking</div></Link>
                </div>
            </div>
        </div>
    )
}

export default MainNavbar