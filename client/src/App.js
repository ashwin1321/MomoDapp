import abi from "./contracts/momo.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import "./App.css";
import photo from "./momo.jpg";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xca90d610f1ca0eb2334d0baca239ba048719bcfe";
      const contractAbi = abi.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("accountsChanged", (accounts) => {
            window.location.reload(); // reload the page on account change
          });
          window.ethereum.on("chainChanged", (accounts) => {
            window.location.reload(); // reload the page on account change
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install Metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  console.log(state);
  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <img
        src={photo}
        class="rounded mx-auto d-block"
        alt=".."
        width="400px"
        height="200px"
      />
      <p
        className="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
}

export default App;
