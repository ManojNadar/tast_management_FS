import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Completed from "./Components/Completed";
import Deleted from "./Components/Deleted";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/completed" element={<Completed />} />
        <Route exact path="/deleted" element={<Deleted />} />
      </Routes>
    </>
  );
}

export default App;
