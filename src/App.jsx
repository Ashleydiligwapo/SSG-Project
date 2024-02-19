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
import Footer from "./components/Footer";
import FreedomCode from "./pages/FreedomCode";
import CreateBoard from "./pages/CreateBoard";
import MenuBar from "./components/MenuBar";
import Lanyards from "./pages/Lanyards";
import Merch from "./pages/Merch";
import MerchUpdate from "./pages/MerchUpdate";

import SideDrawer from "./components/SideDrawer";

import Engage from "./pages/Engage";
import Meetings from "./pages/Meetings";
import Certificates from "./pages/Certificates";
import Orgranization from "./pages/Orgranization";
import Clubs from "./pages/Clubs";
import Departments from "./pages/Departments";
import Dashboard from "./pages/Dashboard";
import UserEdit from "./pages/UserEdit";
import Cart from "./pages/Cart";
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
        <Route path="/Footer" element={<Footer setIsAuth={setIsAuth} />} />
        <Route path="/CreateBoard" element={<CreateBoard isAuth={isAuth} />} />
        <Route path="/MenuBar" element={<MenuBar isAuth={isAuth} />} />
        <Route path="/Lanyards" element={<Lanyards />} />
        <Route path="/Merch" element={<Merch isAuth={isAuth} />} />
        <Route
          path="/MerchUpdate/:id"
          element={<MerchUpdate isAuth={isAuth} />}
        />
        <Route path="/UserEdit/:id" element={<UserEdit isAuth={isAuth} />} />
        <Route path="/SideDrawer" element={<SideDrawer isAuth={isAuth} />} />
        <Route path="/Engage" element={<Engage isAuth={isAuth} />} />
        <Route path="/Meetings" element={<Meetings isAuth={isAuth} />} />
        <Route path="/Certificates" element={<Certificates />} />
        <Route
          path="/Organization"
          element={<Orgranization isAuth={isAuth} />}
        />
        <Route path="/Clubs" element={<Clubs isAuth={isAuth} />} />
        <Route path="/Departments" element={<Departments isAuth={isAuth} />} />
        <Route path="/Dashboard" element={<Dashboard isAuth={isAuth} />} />
        <Route path="/Cart" element={<Cart isAuth={isAuth} />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
