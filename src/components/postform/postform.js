import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const NewPostModal = ({ showModal, handleCloseModal }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} >
      <Modal.Header closeButton>
        <Modal.Title>Create New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="postContent">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter post content" className="bg-dark text-white" />
          </Form.Group>
          <Form.Group controlId="postImage">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" className="bg-dark text-white" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary">Create Post</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewPostModal;
