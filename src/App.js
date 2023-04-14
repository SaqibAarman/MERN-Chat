import { useContext } from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
