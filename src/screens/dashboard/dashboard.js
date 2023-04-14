import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import "./dashboard.css"

import MyNavBar from '../../components/navbar/navbar'

function AdminDashboard() {
    const [users] = useState([
        { id: 1, name: 'Alice', email: 'alice@example.com', role: 'User' },
        { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'Admin' },
        { id: 4, name: 'Dave', email: 'dave@example.com', role: 'User' },
    ]);

    const [selectedUser, setSelectedUser] = useState(null);

    const handleEditUser = (user) => {
        setSelectedUser(user);
    };


    const handleCancelEditUser = () => {
        setSelectedUser(null);
    };

    return (
        <div>
            <MyNavBar></MyNavBar>
            <div className='dashboardContent'>
                <Container fluid className='m-3'>
                    <Row>
                        <Col md={4}>
                            <Card className='m-2 bg-dark text-white'>
                                <Card.Header>User Management</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group controlId="users">
                                            <Form.Label>Users</Form.Label>
                                            <Form.Control as="select" onChange={(e) => handleEditUser(JSON.parse(e.target.value))}>
                                                {users.map((user) => (
                                                    <option key={user.id} value={JSON.stringify(user)}>
                                                        {user.name} ({user.email})
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                    {selectedUser && (
                                        <Form>
                                            <Form.Group controlId="name">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" defaultValue={selectedUser.name} />
                                            </Form.Group>
                                            <Form.Group controlId="email">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" defaultValue={selectedUser.email} />
                                            </Form.Group>
                                            <Form.Group controlId="role">
                                                <Form.Label>Role</Form.Label>
                                                <Form.Control as="select" defaultValue={selectedUser.role}>
                                                    <option value="User">User</option>
                                                    <option value="Company">Company</option>
                                                    <option value="Admin">Admin</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Button variant="primary" >
                                                Save
                                            </Button>{' '}
                                            <Button variant="secondary" onClick={() => handleCancelEditUser()}>
                                                Cancel
                                            </Button>
                                        </Form>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <div className="d-flex justify-content-center align-items-center">
                                <Card className='dashboardBox m-2 bg-dark text-white'>
                                    <Card.Header>Statistics</Card.Header>
                                    <Card.Body>
                                        <p>Contracts Dealt: 50</p>
                                        <p>Users Registered: {users.length}</p>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )

};
export default AdminDashboard;
