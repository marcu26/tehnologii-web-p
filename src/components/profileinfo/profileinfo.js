import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileInfo() {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile`);
  };



  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    };

    fetch(`http://localhost:8081/api/users/get-user`, requestOptions)
      .then(response => response.json())
      .then(result => setUser(result))
      .catch(error => console.log('error', error));
  }, []);

  return (
    <Card bg="dark" text="white" className='m-3'>
      <Card.Body>
        <Image src={user.photo} roundedCircle className="mb-3" width="100" height="100" onClick={handleProfileClick} style={{cursor: 'pointer'}}/>
        <h4 className='hoverable' style={{cursor: 'pointer'}} onClick={handleProfileClick}>{user.username}</h4>
        <p>{user.email}</p>
      </Card.Body>
    </Card>
  );
}
export default ProfileInfo;