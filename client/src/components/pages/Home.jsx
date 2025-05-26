import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../context/authFunction";
import "../styles/home.css";

const UserCard = () => {
  const [user, setUser] = useState(null);
  const [lastDeposit, setLastDeposit] = useState(null);
  const [lastWithdrow, setLastWithdrow] = useState(null);
  const [lastTransfer, setLastTransfer] = useState(null);
  const URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserInfo();
        if (response?.success) {
          setUser(response.message.user);
          setLastDeposit(response.message.lastDeposit);
          setLastWithdrow(response.message.lastWithdrow);
          setLastTransfer(response.message.lastTransfer);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchData();
  }, []);

  if (!user) return <p className="lodding">Loading...</p>;

  return (
    <div className="home-area">
      <div className="user-card">
        <img
          src={`${URL}/uploads/${user.avatar}`} // adjust path if needed
          alt="avatar"
          className="user-avatar"
        />
        <h2 className="user-name">{user.name}</h2>
        <p className="user-balance">Balance: ${user.balance ?? 0}</p>
        <p className="lastDeposit-balance">
          Last Deposit: ${lastDeposit?.amount}
        </p>
        <p className="lastWithdrow-balance">
          Last Withdrow: ${lastWithdrow?.amount}
        </p>

        <p className="lastWithdrow-balance">
          Last Transfer: ${lastTransfer?.amount}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
