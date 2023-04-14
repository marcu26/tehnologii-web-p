import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const ForgotPasswordModal = ({ showModal, handleCloseModal }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCloseModal();
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please enter the email address associated with your account and we'll send you a link to reset your password.</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit">Reset Password</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
