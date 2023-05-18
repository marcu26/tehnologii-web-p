import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap';
import "./messages.css"

import MyNavBar from '../../components/navbar/navbar';

function Messages() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    };
    fetch(`http://localhost:8081/api/users/get-only-friends`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setUsers(Array.isArray(result) ? result : [result]);
        setSelectedUser(result[0]);
      })
      .catch(error => console.log('error', error));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    };
    if (selectedUser) {
      fetch(`http://localhost:8081/api/messages/get/${selectedUser.id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setMessages(result);
        })
        .catch(error => console.log('error', error));
    }
  }, [selectedUser]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleMessageSubmit = (message) => {
    const jwt = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        recipientId: selectedUser.id,
        content: message.content
      })
    };
    fetch("http://localhost:8081/api/messages/create", requestOptions)
      .then(response => response.json())
      .then(result => {
        // Add the new message to the messages list
        setMessages([...messages, result]);
      })
      .catch(error => console.log('error', error));
  };

  return (
    <div>
      <MyNavBar></MyNavBar>
      <div className='messagesContent'>
        <Container fluid className='m-3'>
          <Row>
            <Col md={3}>
              <Card bg="dark" text="white" className='m-2'>
                <Card.Header>Messages</Card.Header>
                <ListGroup variant="flush">
                  {users.map((user) => (
                    <ListGroup.Item
                      key={user.id}
                      action
                      active={selectedUser && selectedUser.id === user.id}
                      onClick={() => handleUserSelect(user)}
                      className="d-flex align-items-center"
                      variant="dark"
                    >
                      <img src={user?.photo} alt={`${user?.username ?? "Unknown"} avatar`} className="mr-3 imageMessages" />
                      <span>{user?.username ?? "Unknown"}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
            <Col md={9} >
              <Card bg="dark" text="white" className='messageBox m-2'>
                <Card.Header>
                  {selectedUser?.username ?? "Unknown"}
                </Card.Header>
                <Card.Body className="message-container">
                  {messages.map((message, index) => (
                    <div key={index} className={`message-item ${message.mine === true ? 'outgoing' : 'incoming'}`}>
                      <div className="message-content">
                      <div className="message-timestamp">{message.timestamp}</div>
                        <div className="message-text">{message.content}</div>
                      </div>
                    </div>
                  ))}
                </Card.Body>
                <Card.Footer>
                  <Form onSubmit={(e) => {
                    e.preventDefault();
                    const message = {
                      from: 'me',
                      content: e.target.elements.message.value,
                    };
                    handleMessageSubmit(message);
                    e.target.elements.message.value = '';
                  }}>
                    <Row>
                      <Col>
                        <Form.Group controlId="message">
                          <Form.Control type="text" placeholder="Enter message" />
                        </Form.Group>
                      </Col>
                      <Col xs="auto">
                        <Button type="submit" variant="primary">
                          Send
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Messages;
