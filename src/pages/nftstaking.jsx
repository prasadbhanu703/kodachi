import React,{useState} from 'react'
import MainLayout from '../components/MainLayout'


export default function NFTStaking() {
    const [selectedBtn, setSelectedBtn] = useState("wallet");
  return (
    <MainLayout>
 <div className="nftstaking-page-wrapper">
    <div className="heading-container">NFT Staking</div>
<div className="main-container">
    
        <div className="heading">Stake your Kodachi NFTs here, rewards are paid out in BNB</div>
        <div className="btn-container">
            <div className={selectedBtn==="wallet"?'btn active':'btn'} onClick={()=>setSelectedBtn("wallet")}>In Wallet (3)</div>
            <div className={selectedBtn==="stake"?'btn active':'btn'} onClick={()=>setSelectedBtn("stake")}>Staked (4)</div>
        </div>
    
    <div className="cards-container">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
    </div>
    {
        selectedBtn==="stake"?  <div className="footer">
        <div className="input-container">
            <label htmlFor="bnb">Total BNB earned</label>
            <div className="input-container__wrapper">
            <div className="input-wrapper">
             <div className="toggle-btn"></div>   
             <input type="text" id='bnb' />
            <div className="toggle-btn">+</div>   
            </div>
            <div className="btn">Claim</div>
            </div>
        </div>
        <div className="btn unstake-btn">Unstake</div>
    </div>:<div className="footer stake-footer">
        <div className="btn unstake-btn">Stake</div>
    </div>
    }
  
</div>
 </div>
    </MainLayout>
  )
}

function Card({Image}){
    return (
        <div className="nft-staking-card">
            <img src="./assets/svg/nft.svg" alt="" />
        </div>
    )
}