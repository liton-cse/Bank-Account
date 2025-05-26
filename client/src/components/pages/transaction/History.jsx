import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import "../../styles/transectionStyle/history.css";

const Histoty = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itremPerPage = 6;
  const { history } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await history();
        const data = response.historyData.history || [];
        if (response.success) {
          setItems(data);
        } else {
          setError(response.message || "History is not fatch from function.");
        }
      } catch {
        setError("History is not found!");
      }
    };
    fetchData();
  }, [history]);

  // Capitalize first letter of the string
  const capitalizeFirstLetter = (str) => {
    if (!str) return ""; // Handle empty string case
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Custom time and date format...
  const customTimeDate = (str) => {
    if (!str) return "";

    const date = new Date(str);

    // Convert to Bangladesh time (UTC+6) and format
    const options = {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour format with AM/PM
    };
    const bangladeshFormattedDateTime = date.toLocaleString("en-GB", options);
    return bangladeshFormattedDateTime;
  };

  // Paggination logic .. ..
  const indexOfLastItem = currentPage * itremPerPage;
  const indexOfFirstItem = indexOfLastItem - itremPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itremPerPage);

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="history-area">
      {error && <p className="error-message">{error}</p>}
      <div className="history-card">
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <div className="card" key={index}>
              <h3 className="card-header">
                ✅ {capitalizeFirstLetter(item.type)} Money ...
              </h3>
              <p className="history-crad-id">
                <strong>ID: </strong>
                {item.userId}
              </p>
              <p className="history-card-email">
                <strong>Receive_Id: </strong>
                {item.receiveId}
              </p>
              <p className="history-card-amount">
                <strong>Amount: </strong>
                {item.amount}
              </p>
              <p className="history-card-description">
                <strong>Description: </strong>
                {item.description}
              </p>
              <p className="history-card-date">
                <strong>Date: </strong>
                {customTimeDate(item.date)}
              </p>
            </div>
          ))
        ) : (
          <div className="history-error">
            <h1>No history found.</h1>
            <p className="history-error-para">{error}</p>
          </div>
        )}
      </div>
      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Histoty;
