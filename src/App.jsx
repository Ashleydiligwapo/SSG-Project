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
import Navigation from "./components/Navigation";
import SideDrawer from "./components/SideDrawer";
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
        ></Route>
        <Route
          path="/Navigation"
          element={<Navigation isAuth={isAuth} />}
        ></Route>
        <Route
          path="/SideDrawer"
          element={<SideDrawer isAuth={isAuth} />}
        ></Route>
      </Routes>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
