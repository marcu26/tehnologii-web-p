import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import MyNavBar from '../../components/navbar/navbar'
import './job.css'

const JobPosting = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };



  return (
    <div>
      <MyNavBar></MyNavBar>
      <div className='leftSideJob'></div>
      <div className='contentJob'>
        <Card bg="dark" text="white" className='m-4'>
          <Card.Body>
            <Card.Title>Job Frumos</Card.Title>
            <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec pharetra lacus. Sed justo arcu, scelerisque ac mollis eu, rutrum ut nisi. Vestibulum nec nibh volutpat, gravida ligula ut, sollicitudin nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel arcu eu mi blandit eleifend a quis eros. Mauris consequat tellus in nisl ornare vehicula. Aliquam in turpis purus. Morbi fermentum enim vitae eleifend gravida.

              Etiam imperdiet porttitor sapien quis faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum libero rutrum tortor ullamcorper bibendum. Cras scelerisque tincidunt risus, vitae semper sem ornare eu. Maecenas nec iaculis purus.</Card.Text>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group controlId="formBasicResume">
                <Form.Label>Resume</Form.Label>
                <Form.Control
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicLetter">
                <Form.Label>Letter of recomandation</Form.Label>
                <Form.Control
                  type="file"
                  name="letter"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="outline-primary" type="submit" className='my-4'>
                Apply
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <div className='leftSideJob'></div>
    </div>
  );
};

export default JobPosting;
