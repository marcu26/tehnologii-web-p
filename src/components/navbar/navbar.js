import * as React from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../images/userIcon.png'
import './navbar.css'
import SearchBar from '../searchbar/searchbar';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';

function GetNavbar() {

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };
  

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleMessagesClick = () => {
    navigate('/messages');
  };

  const handleJobsClick = () => {
    navigate(`/jobs?search=${searchValue}`);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleAdminClick = () => {
    navigate('/dashboard');
  };

  const handleAppliancesClick = () => {
    navigate('/appliances');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    navigate('/login');
  };


  const DropdownMenu = () => {
    const jwt = localStorage.getItem('jwt');
  
    if (jwt == null) {
      return (
        <Nav.Link onClick={handleLoginClick}>Log In</Nav.Link>
      );
    } else {
      const decodedToken = jwtDecode(jwt);
      const isAdmin = decodedToken.roles.some((role) => role.authority === 'Admin');
  
      return (
        <NavDropdown
          title={<img src={logo} alt="User" className='userLogo' />}
          id="basic-nav-dropdown"
          drop="start"
        >
          <NavDropdown.Item onClick={handleProfileClick}>Profile</NavDropdown.Item>
          {isAdmin && <NavDropdown.Item onClick={handleAdminClick}>Admin</NavDropdown.Item>}
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogOutClick}>Log out</NavDropdown.Item>
        </NavDropdown>
      );
    }
  };
  

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand className="px-2 justify-content-start " onClick={handleHomeClick} style={{ cursor: 'pointer' }}>PathFinder</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <SearchBar onChange={handleSearchChange}/>
        <Nav className="px-4 me-auto">
          <Nav.Link onClick={handleHomeClick}>Home</Nav.Link>
          <Nav.Link onClick={handleJobsClick}>Jobs</Nav.Link>
          {localStorage.getItem('jwt') != null ? (
            <Nav.Link onClick={handleMessagesClick}>Messages</Nav.Link>
          ) : null}
            {localStorage.getItem('jwt') != null ? (
            <Nav.Link onClick={handleAppliancesClick}>Appliances</Nav.Link>
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



