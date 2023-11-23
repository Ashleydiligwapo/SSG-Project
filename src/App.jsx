import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import Background from "./components/background";
import SlideBox from "./components/SlideBox";
import BoxSide from "./components/BoxSide";
import "./index.css";
import ChakraSlider from "./components/ChakraSlider";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import PostCreate from "./pages/PostCreate";
import Board from "./pages/Board";
import FreedomCode from "./pages/FreedomCode";
import CreateBoard from "./pages/CreateBoard";
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  return (
    <Router>
      <div className="w-full">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/Board" element={<Board />} />
        <Route path="/FreedomCode" element={<FreedomCode isAuth={isAuth} />} />
        <Route path="/PostCreate" element={<PostCreate isAuth={isAuth} />} />

        <Route path="/CreateBoard" element={<CreateBoard isAuth={isAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
