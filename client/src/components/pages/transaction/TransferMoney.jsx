import React, { useState } from "react";
import "../../styles/transectionStyle/tranferMoney.css";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TransferMoney = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { transferMoney } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await transferMoney({ recipient, amount });
      if (response.success) {
        //toast for success
        toast.success("Transfer Money Successfully!", {
          position: "top-center",
          autoClose: 2000, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast-success",
        });
        setRecipient("");
        setAmount("");
        navigate("/history");
      } else {
        setError(response.message || "Transfer Failed");
        // Show error toast
        toast.error(response.message || "Transfer Failed", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast-error", // Custom class for error toast
        });
      }
    } catch {
      setError("Transfer Failed ! Please try again");
      // Show error toast
      toast.error("Deposit failed, please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast-error", // Custom class for error toast
      });
    }
  };

  return (
    <div className="transfer-container">
      <div className="transfer-card">
        <h1 className="transfer-title">Transfer Money</h1>
        <form onSubmit={handleSubmit} className="transfer-form">
          <div className="form-group">
            <label htmlFor="recipient" className="form-label">
              Recipient Email
            </label>
            <input
              type="email"
              id="recipient"
              name="recipient"
              value={recipient}
              placeholder="Enter recipient email"
              required
              onChange={(e) => setRecipient(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              placeholder="Enter amount"
              required
              onChange={(e) => setAmount(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="transfer-button">
            Transfer
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {""}
      </div>
    </div>
  );
};

export default TransferMoney;
