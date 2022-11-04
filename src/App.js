import "./styles/main.scss";
import "./styles/global.scss";
import Staking from "./pages/staking";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import NFTStaking from "./pages/nftstaking";
import Liquidity from "./pages/liquidity";
import ReConnect from "./shared/wallets/reconnect";
import Swap from "./pages/swap/swap";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes >
          <Route exact path="/" element={<><Swap /></>} />
          <Route exact path="/staking" element={<Staking />} />
          <Route exact path="/nft-staking" element={<NFTStaking/>} />
          <Route exact path="/liquidity" element={<Liquidity/>} />
        </Routes>
      </Router>
      <ReConnect />
      <Toaster />
    </div>
  );
}

export default App;
