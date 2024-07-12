import abi from "./contract/chai.json";
import { useState, useEffect } from "react";
import Web3 from "web3";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import "./App.css";
import bg from "./components/Images/BLOCKCHAIN CHAI WALA.png";

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
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const web3 = new Web3(ethereum);
          const contract = new web3.eth.Contract(contractABI, contractAddress);
          setAccount(accounts[0]);
          setState({ provider: web3, signer: accounts[0], contract });
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <div className="main-container">
      <img src={bg} alt="" className="background" />
      <p className="lead">
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
