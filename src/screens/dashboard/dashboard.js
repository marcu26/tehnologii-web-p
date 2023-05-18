import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import "./dashboard.css"
import { useEffect } from 'react';



import MyNavBar from '../../components/navbar/navbar'

function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkillTitle, setNewSkillTitle] = useState("");
  const [acceptedAppliances, setAcceptedAppliances] = useState(0);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
  
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    };
  
    fetch("http://localhost:8081/api/appliances/get-number", requestOptions)
      .then(response => response.text())
      .then(result => setAcceptedAppliances(parseInt(result)))
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

    fetch(`http://localhost:8081/api/users/get-users`, requestOptions)
      .then(response => response.json())
      .then(result => setUsers(Array.isArray(result) ? result : [result]))
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

    fetch("http://localhost:8081/api/skills/get-all", requestOptions)
      .then(response => response.json())
      .then(result => setSkills(result))
      .catch(error => console.log('error', error));
  }, []);

  const handleCreateSkill = () => {
    const jwt = localStorage.getItem('jwt');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${jwt}`);

    const raw = JSON.stringify({
      "title": `${newSkillTitle}`
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };


    const requestOptions2 = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    };

    fetch("http://localhost:8081/api/skills/create", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        fetch("http://localhost:8081/api/skills/get-all", requestOptions2)
          .then(response => response.json())
          .then(result => setSkills(result))
          .catch(error => console.log('error', error));
      })
      .catch(error => console.log('error', error));
  };

  const handleDeleteSkill = (skillId) => {
    const jwt = localStorage.getItem('jwt');

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt}`);
    myHeaders.append("Content-Type", "application/json"); // Add Content-Type header

    var raw = JSON.stringify({
      "id": parseInt(skillId)
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const requestOptions2 = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    };

    fetch(`http://localhost:8081/api/skills/delete`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        fetch("http://localhost:8081/api/skills/get-all", requestOptions2)
          .then(response => response.json())
          .then(result => setSkills(result))
          .catch(error => console.log('error', error));
      })
      .catch(error => console.log('error', error));
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setName(user.username);
    setEmail(user.email);
    setPassword(user.password)
  };

  const handleCancelEditUser = () => {
    setSelectedUser(null);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSaveUser = (event) => {
    event.preventDefault();

    const jwt = localStorage.getItem('jwt');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${jwt}`);

    const raw = JSON.stringify({
      "id": selectedUser.id,
      "username": name,
      "email": email,
      "password": password
    });

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8081/api/users/update-user-admin", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        setSelectedUser(null);
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch(error => console.log('error', error));
  };

  return (
    <div>
      <MyNavBar />
      <div className="dashboardContent">
        <Container fluid className="m-3">
          <Row>
            <Col md={4}>
              <Card className="m-2 bg-dark text-white">
                <Card.Header>User Management</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group controlId="users">
                      <Form.Label>Users</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={(e) => handleEditUser(JSON.parse(e.target.value))}
                      >
                        {users.map((user) => (
                          <option key={user.id} value={JSON.stringify(user)}> {user.username} ({user.email})
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Form>
                  {selectedUser && (
                    <Form>
                      <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={selectedUser.name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          defaultValue={selectedUser.email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          defaultValue={selectedUser.password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <Button variant="primary" onClick={handleSaveUser}>Save</Button>{" "}
                      <Button
                        variant="secondary"
                        onClick={() => handleCancelEditUser()}
                      >
                        Cancel
                      </Button>
                    </Form>
                  )}
                </Card.Body>
              </Card>
              <Card className="m-2 bg-dark text-white">
                <Card.Header>Skills</Card.Header>
                <Card.Body>

                  <Form.Group controlId="newSkillTitle">
                    <Form.Control
                      type="text"
                      value={newSkillTitle}
                      onChange={(e) => setNewSkillTitle(e.target.value)}
                      placeholder='New skill title'
                      className='my-2'
                    />
                  </Form.Group>

                  <Button variant="primary" onClick={handleCreateSkill}>Create Skill</Button>
                  <ul style={{ display: 'flex', flexDirection: 'column' }}>
                    {skills.map((skill) => (
                      <li
                        key={skill.id}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        <span>{skill.title}</span>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleDeleteSkill(skill.id)}
                          className='my-1'
                        >
                          Delete
                        </Button>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={8}>
              <div className="d-flex justify-content-center align-items-center">
                <Card className="dashboardBox m-2 bg-dark text-white">
                  <Card.Header>Statistics</Card.Header>
                  <Card.Body>
                    <p>Appliances accepted: {acceptedAppliances}</p>
                    <p>Users Registered: {users.length}</p>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );

};
export default AdminDashboard;
