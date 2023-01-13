import { ethers } from "ethers";

const Buy = ({ state }) => {
  const buyMomo = async (e) => {
    e.preventDefault();
    const { contract } = state;
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    console.log(name, message, contract);
    const amount = { value: ethers.utils.parseEther("0.001") };
    const transaction = await contract.buyMomo(name, message, amount); // smart contract function buyMomo
    await transaction.wait();
    console.log("MOMO BOUGHT");
  };

  return (
    <>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={buyMomo}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Message"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Pay
          </button>
        </form>
      </div>
    </>
  );
};

export default Buy;
