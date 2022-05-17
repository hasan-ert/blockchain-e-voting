import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//import Components
import Home from "./components/HomeComponents/Home";
import NavigationBar from "./components/Navbar/Navbar";
import FooterNew from "./components/Footer/Footer";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
import Election from "./components/Election";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar></NavigationBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/election/:id" element={<Election></Election>}></Route>
        </Routes>
      </Router>
      <FooterNew />
    </div>
  );
}

export default App;
