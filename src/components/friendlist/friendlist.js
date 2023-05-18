import { Card, ListGroup, Image, Button } from 'react-bootstrap';
import "./friendlist.css"
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useEffect } from 'react';


function FriendList() {

  const [friends, setFriends] = useState([]);

  const navigate = useNavigate();

  const handleMessagesClick = () => {
    navigate('/messages');
  };

  const handleProfileClick = (userId) => {
    navigate(`/otherProfile/${userId}`);
  };

  const handleAddFriendClick = (friendId) => {
    const jwt = localStorage.getItem('jwt');
    const friendIdI = parseInt(friendId);
  
    if (isNaN(friendIdI)) {
      console.error(`Invalid friend ID: ${friendId}`);
      return;
    }
  
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    };
  
    fetch(`http://localhost:8081/api/users/add-friend/${friendIdI}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
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

    fetch(`http://localhost:8081/api/users/get-friends`, requestOptions)
      .then(response => response.json())
      .then(result => setFriends(Array.isArray(result) ? result : [result]))
      .catch(error => console.log('error', error));
  }, []);

  return (
    <Card bg='dark' text='white' className='m-3'>
      <Card.Header>Users List</Card.Header>
      <ListGroup variant="flush">
        {friends.map((friend) => (
          <ListGroup.Item key={friend.id} variant="dark" className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Image src={friend.photo} roundedCircle style={{ marginRight: '10px' }} className='images' />
              <span onClick={() => handleProfileClick(friend.id)} style={{cursor: 'pointer'}} className='hoverable'>
          {friend.username}
        </span>
            </div>
            {friend.friend ? (
              <Button variant="outline-dark" onClick={handleMessagesClick}>Message</Button>
            ) : (
              <Button variant="outline-dark" onClick={() => handleAddFriendClick(friend.id)}>Add</Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default FriendList;
