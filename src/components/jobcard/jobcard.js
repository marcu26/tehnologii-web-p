import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function JobCard(props) {
  const { company, title, skills, image } = props;

  const navigate = useNavigate();

  const handleViewJobClick = () => {
    navigate('/job');
  };

  return (
    <Card bg="dark" text="light" className='m-3'>
      <div style={{ display: 'flex' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{company}</Card.Subtitle>
          <Card.Text>
            <Badge variant="secondary" bg="success" className="mr-1">{skills[0]}</Badge>
            <Badge variant="secondary" bg="success" className="mr-1">{skills[1]}</Badge>
            <Badge variant="secondary" bg="success" className="mr-1">{skills[2]}</Badge>
          </Card.Text>
          <Button variant="outline-primary" onClick={handleViewJobClick}>View job</Button>
        </Card.Body>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <img src={image} alt={company} style={{ maxWidth: 100 }} className='m-3' />
        </div>
      </div>
    </Card>
  );
}

export default JobCard;
