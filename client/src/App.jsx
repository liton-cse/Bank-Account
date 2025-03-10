import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/REgister";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";

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
        </Routes>
      </main>

      <footer></footer>
    </>
  );
}

export default App;
