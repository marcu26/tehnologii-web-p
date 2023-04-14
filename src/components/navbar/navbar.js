import * as React from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import IsLoggedIn from '../../GlobalVars/IsLoggedIn'
import logo from '../../images/userIcon.png'
import './navbar.css'
import SearchBar from '../searchbar/searchbar';
import isLoggedIn from '../../GlobalVars/IsLoggedIn';


function GetNavbar() {

  const navigate = useNavigate();

  const setIsLoggedIn = () => {
    if (IsLoggedIn.value === "0") {
      IsLoggedIn.value = "1";
    }
    else {
      IsLoggedIn.value = "0";
    }
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleMessagesClick = () => {
    navigate('/messages');
  };

  const handleJobsClick = () => {
    navigate('/jobs');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleAdminClick = () => {
    navigate('/dashboard');
  };

  const handleHomeClick = () => {
    navigate('/');
  };


  const DropdownMenu = () => {
    if (IsLoggedIn.value === "0") {
      return (
        <Nav.Link onClick={handleLoginClick}>Log In</Nav.Link>
      );
    } else {
      return (

        <NavDropdown title={<img src={logo} alt="User" className='userLogo' />} id="basic-nav-dropdown" drop="start" hidearrow='true'>
          <NavDropdown.Item onClick={handleProfileClick}>Profile</NavDropdown.Item>
          <NavDropdown.Item onClick={handleAdminClick}>Admin</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={setIsLoggedIn}>Log out</NavDropdown.Item>
        </NavDropdown >

      );
    }
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand className="px-2 justify-content-start " onClick={handleHomeClick} style={{ cursor: 'pointer' }}>PathFinder</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <SearchBar />
        <Nav className="px-4 me-auto">
          <Nav.Link onClick={handleHomeClick}>Home</Nav.Link>
          <Nav.Link onClick={handleJobsClick}>Jobs</Nav.Link>
          {isLoggedIn.value==="1" ? (
            <Nav.Link onClick={handleMessagesClick}>Messages</Nav.Link>
          ) : null}
        </Nav>
        <Nav className="px-5" >
          <DropdownMenu />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default GetNavbar



