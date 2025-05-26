import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/pages/Home";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";
import Deposit from "./components/pages/transaction/Deposit";
import Withdrow from "./components/pages/transaction/Withdrow";
import TransferMoney from "./components/pages/transaction/TransferMoney";
import Histoty from "./components/pages/transaction/History";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deposit"
            element={
              <ProtectedRoute>
                <Deposit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/withdrow"
            element={
              <ProtectedRoute>
                <Withdrow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transfer"
            element={
              <ProtectedRoute>
                <TransferMoney />
              </ProtectedRoute>
            }
          />
          <Route path="/history" element={<Histoty />} />
        </Routes>

        {/* ToastContainer with global configuration */}
        <ToastContainer
          position="top-center" // Position of the toasts
          autoClose={2000} // Auto-close after 2 seconds
          hideProgressBar={true} // Show progress bar
          newestOnTop={true} // New toasts appear below older ones
          closeOnClick // Close toasts on click
          rtl={false} // Left-to-right layout
          pauseOnFocusLoss // Pause toast timer when the window loses focus
          draggable // Allow dragging to dismiss
          pauseOnHover // Pause toast timer on hover
        />
      </main>

      <footer></footer>
    </>
  );
}

export default App;
