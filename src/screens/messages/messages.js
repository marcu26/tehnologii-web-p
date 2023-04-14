import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap';
import "./messages.css"

import MyNavBar from '../../components/navbar/navbar';

function Messages() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', image: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg', messages: [] },
    { id: 2, name: 'Bob', image: 'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg', messages: [] },
    { id: 3, name: 'Charlie', image: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg', messages: [] },
    { id: 4, name: 'Dave', image: 'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg', messages: [] },
  ]);

  const [selectedUser, setSelectedUser] = useState(users[0]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleMessageSubmit = (message) => {
    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          messages: [...user.messages, message],
        };
      } else {
        return user;
      }
    });

    setUsers(updatedUsers);
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
                      active={selectedUser.id === user.id}
                      onClick={() => handleUserSelect(user)}
                      className="d-flex align-items-center"
                      variant="dark"
                    >
                      <img src={user.image} alt={`${user.name} avatar`} className="mr-3 imageMessages" />
                      <span>{user.name}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
            <Col md={9} >
              <Card bg="dark" text="white" className='messageBox m-2'>
                <Card.Header>
                  {selectedUser.name}
                </Card.Header>
                <Card.Body className="message-container">
                  {selectedUser.messages.map((message, index) => (
                    <div key={index} className={`message-item ${message.from === 'me' ? 'outgoing' : 'incoming'}`}>
                      {message.content}
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
