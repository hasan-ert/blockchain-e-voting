import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row, Navbar, NavbarBrand, Nav } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { ethers } from "ethers";
//Css import
import "./Navbar.css";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
export default function NavigationBar({
  adminAddress,
  walletAddress,
  handleWalletAddress,
}) {
  async function connectWallet() {
    console.log("Requesting account...");
    // ❌ Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        handleWalletAddress(accounts[0]);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  }

  function showAdminPanel() {
    if (walletAddress === adminAddress) {
      return (
        <Nav.Link as={Link} to={"/startelection"}>
          <h5>Admin Panel</h5>
        </Nav.Link>
      );
    }
  }
  return (
    <Navbar sticky="top" expand="lg">
      <Container fluid className="nav-main-container">
        <NavbarBrand>
          <a href={"/"} style={{ textDecoration: "none" }}>
            <h2>EVote</h2>
          </a>
        </NavbarBrand>
        <NavbarToggle aria-controls="nav-collapse" />
        <NavbarCollapse id="nav-collapse">
          <Nav
            className="ms-auto"
            style={{ paddingRight: "2rem", paddingLeft: "2rem" }}
          >
            <Nav.Link as={Link} to={"/"}>
              <h5>Home</h5>
            </Nav.Link>
            <Nav.Link as={Link} to={"/all-elections"}>
              <h5>Ongoing Elections</h5>
            </Nav.Link>
            {showAdminPanel()}
            <Nav.Link
              id="nav-login-link"
              onClick={() => {
                connectWallet();
              }}
            >
              <h5>
                {walletAddress !== undefined && walletAddress !== ""
                  ? "..." + walletAddress.substring(walletAddress.length - 3)
                  : "Connect Wallet"}
              </h5>
            </Nav.Link>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
