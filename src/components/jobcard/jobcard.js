import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


function JobCard(props) {
  const { company, title, skills, image, isMine, jobId, companyId } = props;

  const navigate = useNavigate();

  const handleViewJobClick = () => {
    navigate(`/job/${jobId}`);
  };


  const handleProfileClick = () => {
    navigate(`/otherProfile/${companyId}`);
  };


  const handleDeleteClick = () => {
    var myHeaders = new Headers();
    const jwt = localStorage.getItem('jwt');
    myHeaders.append("Authorization", `Bearer ${jwt}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:8081/api/jobs/delete/${jobId}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };


  return (
    <Card bg="dark" text="light" className="m-3">
      <div style={{ display: 'flex' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="hoverable mb-2" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>{company}</Card.Subtitle>
          <Card.Text>
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" bg="success" className="mr-1">
                {skill}
              </Badge>
            ))}
          </Card.Text>
          <Button variant="outline-primary" onClick={handleViewJobClick}>
            View job
          </Button>
          {isMine && (
            <Button variant="outline-danger" className="mx-2" onClick={handleDeleteClick}>
              Delete
            </Button>
          )}
        </Card.Body>
        <div
          style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <img src={image} alt={company} style={{ maxWidth: 100 }} className="m-3" />
        </div>
      </div>
    </Card>
  );
}

export default JobCard;
