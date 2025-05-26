import React, { useState } from "react";
import { toast } from "react-toastify"; // Import toast (but not ToastContainer)
import "../../styles/transectionStyle/deposit.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { deposit } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset the error state before submission

    try {
      const response = await deposit({ amount });
      if (response.success) {
        // Show success toast
        toast.success("Deposit Money Successfully!", {
          position: "top-center",
          autoClose: 2000, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast-success", // Custom class for success toast
        });
        setAmount("");
        navigate("/history");
      } else {
        setError(response.message || "Deposit failed!");
        // Show error toast
        toast.error(response.message || "Deposit failed!", {
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
    } catch (err) {
      console.error("Deposit Error:", err);
      setError("Deposit failed, please try again.");
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
    <div className="deposit-area">
      <div className="deposit">
        <h1 className="deposit-header">Deposit Money</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="amount">Deposit Money</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            placeholder="Enter deposit money"
            required
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          {/* Display error message */}
          <button type="submit">Deposit</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Deposit;
