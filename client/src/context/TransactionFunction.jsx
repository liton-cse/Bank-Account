import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
// Integate the front end to back end with api in Deposit money...
export const deposit = async ({ amount }) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { success: false, message: "No authentication token found" };
    }
    const response = await axios.post(
      `${URL}/transaction/deposit`,
      { amount },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, depositData: response.data };
  } catch (error) {
    console.error("Deposit API Error:", error?.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "Deposit Failed",
    };
  }
};

// Integratee API with Withdrow money....

export const withdrow = async ({ amount }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Authorization token is not found" };
    }
    const response = await axios.post(
      `${URL}/transaction/withdrow`,
      { amount },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const withdrowData = response.data;
    return {
      success: true,
      balance: withdrowData.balance,
    };
  } catch (error) {
    console.log("Withdrow Errror: ", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "Withdrow Failed",
    };
  }
};

//Integrating transfer money API with frontend function...

export const transferMoney = async ({ recipient, amount }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        success: false,
        message: "Authorization is not valid",
      };
    }
    const response = await axios.post(
      `${URL}/transaction/transfer`,
      { recipient, amount },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      success: true,
      transferData: response.data,
    };
  } catch (error) {
    console.log("Transfer Error:", error?.response?.data?.message);
    return {
      success: false,
      message: error?.response?.data?.message,
    };
  }
};

//Integrating history with front end and api..

export const history = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        success: false,
        message: "Authorization token is not found",
      };
    }
    const response = await axios.get(`${URL}/transaction/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      historyData: response.data,
    };
  } catch (error) {
    console.log(error?.response?.data?.message || "History not found");
    return {
      success: false,
      message: error?.response?.data?.message,
    };
  }
};

// intefrating the latest history for the home page of type base transaction...

export const latestHistory = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        success: false,
        message: "Authorization token is not found",
      };
    }
    const response = await axios.get(`${URL}/transaction/latest-history`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      success: true,
      latestData: response.data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error?.response?.data?.message,
    };
  }
};
