import abi from "./contract/chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import "./App.css";
import bg from "./components/Images/BLOCKCHAIN CHAI WALA.png"

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x0b3B8aC9b6d097D5D4B6A47B0B96767c6Ec51536";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  // console.log(state);
  return (
    <div className="main-container">
      <img src={bg} alt="" className="background" />
      <p
        class="lead"
      >
        <small>Connected Account - {account}</small>
      </p>
<div className="head">
<h3>Thank You For Buying Our Chai 💕💕</h3>
      <h4>Now You Can Pay and Write Your Feedback From Here😊😊</h4>
</div>
      

      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
}

export default App;
