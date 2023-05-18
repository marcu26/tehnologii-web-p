import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const NewJobModal = ({ showModal, handleCloseModal }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [badgeOptions, setBadgeOptions] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    fetch("http://localhost:8081/api/skills/get-all", {
      headers: {
        "Authorization":`Bearer ${jwt}`
      }
    })
      .then(response => response.json())
      .then(data => setBadgeOptions(data))
      .catch(error => console.log(error));
  }, []);

  const handleSubmit = (event) => {
    const jwt = localStorage.getItem('jwt');
    event.preventDefault();
    handleCloseModal();

    const requestBody = {
      title: jobTitle,
      description: jobDescription,
      userId: 33, 
      skillIds: selectedBadges
    };

    const requestOptions = {
      method: 'POST',
      
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify(requestBody),
      redirect: 'follow'
    };

    fetch("http://localhost:8081/api/jobs/create", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };


  const handleBadgeChange = (event) => {
    const badgeValue = parseInt(event.target.value);
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
                  key={badgeOption.id}
                  type="checkbox"
                  label={badgeOption.title}
                  value={badgeOption.id}
                  checked={selectedBadges.includes(badgeOption.id)}
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
