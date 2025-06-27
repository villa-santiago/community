import "./App.css";
import { Routes, Route } from "react-router-dom";
import PingTest from "./components/PingTest";
import HomePage from "./pages/HomePage";
import TestAuth from "./components/TestAuth";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}


export default App;
