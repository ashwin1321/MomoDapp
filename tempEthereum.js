import { useState, useEffect } from 'react'
import { ethers } from "ethers";
import abi from './contracts/momo.json'

function App() {
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
    })

    useEffect(() => {
        const connectWallet = async () => {
            const contractAddress = "0xca90d610f1ca0eb2334d0baca239ba048719bcfe";
            const contractAbi = abi.abi;

            try {
                const { ethereum } = window;

                if (ethereum) {
                    const account = await ethereum.request({ "method": "eth_requestAccounts" });
                }
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractAbi, signer);
                setState({ provider, signer, contract })
            }

            catch (error) {
                console.log(error)
            }
        }
    })
    return (
        <div className="App">
            sasfa
        </div>
    );
}

export default App;
