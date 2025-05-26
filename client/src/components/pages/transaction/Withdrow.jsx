import React, { useState } from "react";
import "../../styles/transectionStyle/withdrow.css";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Withdrow = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { withdrow } = useAuth();
  const navigate = useNavigate();
  const handdleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await withdrow({ amount });
      if (response.success) {
        //toast for success
        toast.success("Withdrow money successfully!", {
          position: "top-center",
          autoClose: 2000, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast-success",
        });
        setAmount("");
        navigate("/history");
      } else {
        setError(response.message || "Withdrow Failled");
        // Show error toast
        toast.error(response.message || "Withdrow Failed", {
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
      setError("Withdrow Failled! Please Try Again");
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
    <div className="withdrow-area">
      <div className="withdrow">
        <h1 className="withdrow-header">Withdrow Money</h1>
        <form onSubmit={handdleSubmit}>
          <label htmlFor="amount">Withdrow Money</label>
          <input
            type="number"
            id="amount"
            name="amont"
            value={amount}
            placeholder="Enter withdrow money"
            required
            onChange={(e) => setAmount(e.target.value)}
          />
          <button type="submit">Withdrow</button>
        </form>
        {error && <p className="error-message">{error}</p>}{" "}
      </div>
    </div>
  );
};
export default Withdrow;
