import Web3 from "web3";
import "./Buy.css";

const Buy = ({ state }) => {
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract, signer } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    console.log(name, message, contract);

    const amount = Web3.utils.toWei("0.001", "ether");

    try {
      const transaction = await contract.methods.buyChai(name, message).send({
        from: signer,
        value: amount,
      });
      console.log("Transaction is done", transaction);
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

  return (
    <>
      <div className="buy-container">
        <form onSubmit={buyChai}>
          <div className="mb">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb">
            <label className="form-label">Message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Message"
            />
          </div>
          <button className="btn" disabled={!state.contract}>
            Spread Your Love❤️
          </button>
        </form>
      </div>
    </>
  );
};

export default Buy;
