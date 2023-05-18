import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import MyNavBar from '../../components/navbar/navbar';
import { useParams } from 'react-router-dom';
import './job.css';
import { useNavigate } from "react-router-dom";

const JobPosting = () => {
  const navigate = useNavigate();

  const { jobId } = useParams();
  const [job, setJob] = useState({});
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    jobId: parseInt(jobId),
    cv: '',
    letterOfRecommendation: '',
  });

  const handleChange = (event) => {
    const { name, files } = event.target;
    const fileName = files[0].name;
    setFormData({ ...formData, [name]: fileName });
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const jwt = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(formData),
      redirect: 'follow',
    };

    fetch("http://localhost:8081/api/appliances/create", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    const jobIdI = parseInt(jobId);

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    };

    fetch(`http://localhost:8081/api/jobs/get/${jobIdI}`, requestOptions)
      .then(response => response.json())
      .then(result => setJob(result))
      .catch(error => console.log('error', error));
  }, [jobId]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    };

    fetch(`http://localhost:8081/api/users/get-user`, requestOptions)
      .then(response => response.json())
      .then(result => setUser(result))
      .catch(error => console.log('error', error));
  }, []);

  const handleProfileClick = (userId) => {
    navigate(`/otherProfile/${userId}`);
  };

  return (
    <div>
      <MyNavBar></MyNavBar>
      <div className='leftSideJob'></div>
      <div className='contentJob'>
        <Card bg="dark" text="white" className='m-4'>
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <span onClick={() => handleProfileClick(job.userId)} style={{cursor: 'pointer'}} className='hoverable'>
         {job.userName}
        </span>
        <hr></hr>
            <Card.Text>{job.description}<br></br>
          </Card.Text>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  readOnly
                  value={user.username}
                  className="constant-field"
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  readOnly
                  placeholder={user.email}
                  className="constant-field" 
                />
              </Form.Group>

              <Form.Group controlId="formBasicResume">
                <Form.Label>Resume</Form.Label>
                <Form.Control
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicLetter">
                <Form.Label>Letter of Recommendation</Form.Label>
                <Form.Control
                  type="file"
                  name="letterOfRecommendation"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                />
              </Form.Group>

              {!job.mine && (
                <Button variant="outline-primary" type="submit" className='my-4'>
                  Apply
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      </div>
      <div className='leftSideJob'></div>
    </div>
  );
};

export default JobPosting;
