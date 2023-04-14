import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const badgeOptions = [
  { label: 'React', value: 'react' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'MongoDB', value: 'mongodb' },
];

const NewJobModal = ({ showModal, handleCloseModal }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedBadges, setSelectedBadges] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCloseModal();
  };

  const handleBadgeChange = (event) => {
    const badgeValue = event.target.value;
    const badgeIndex = selectedBadges.indexOf(badgeValue);
    if (badgeIndex === -1) {
      setSelectedBadges([...selectedBadges, badgeValue]);
    } else {
      setSelectedBadges([...selectedBadges.slice(0, badgeIndex), ...selectedBadges.slice(badgeIndex + 1)]);
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} className="bg-dark">
      <Modal.Header closeButton>
        <Modal.Title>Create New Job Posting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="jobTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter job title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="bg-dark text-white" />
          </Form.Group>
          <Form.Group controlId="jobDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter job description" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="bg-dark text-white" />
          </Form.Group>
          <Form.Group controlId="jobTags">
            <Form.Label>Tags</Form.Label>
            <div>
              {badgeOptions.map((badgeOption) => (
                <Form.Check
                  key={badgeOption.value}
                  type="checkbox"
                  label={badgeOption.label}
                  value={badgeOption.value}
                  checked={selectedBadges.includes(badgeOption.value)}
                  onChange={handleBadgeChange}
                />
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>Create Job Posting</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewJobModal;
