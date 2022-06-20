import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//import Components
import Home from "./components/HomeComponents/Home";
import NavigationBar from "./components/Navbar/Navbar";
import FooterNew from "./components/Footer/Footer";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
import Election from "./components/Election";
import StartElection from "./components/StartElection";
import { useState, useEffect } from "react";
import AllElections from "./components/Elections/AllElections";

const adminAddress = "0xa867dCacaF5B1c7c51Ca6E90B3D13db32f46bd62".toLowerCase();
function App() {
  const [walletAddress, setWalletAddress] = useState();

  const handleWalletAddress = (e) => {
    setWalletAddress(e);
  };

  useEffect(() => {}, [walletAddress]);

  const showAdminPanel = () => {
    debugger;
    if (walletAddress === adminAddress) {
      return (
        <Route
          path="/startelection"
          element={<StartElection></StartElection>}
        ></Route>
      );
    }
  };
  return (
    <div className="App">
      <Router>
        <NavigationBar
          handleWalletAddress={handleWalletAddress}
          walletAddress={walletAddress}
          adminAddress={adminAddress}
        ></NavigationBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/election/:id" element={<Election></Election>}></Route>
          <Route
            path="/all-elections"
            element={<AllElections></AllElections>}
          ></Route>
          {showAdminPanel()}
        </Routes>
      </Router>
      <FooterNew />
    </div>
  );
}

export default App;
