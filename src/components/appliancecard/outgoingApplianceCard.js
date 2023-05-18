import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './appliance.css'

function OutgoingApplianceCard(props) {
  const { id, state, jobName, jobId, userName, userId, cv, letterOfRecommendation } = props;

  const navigate = useNavigate();

  const handleDelete = () => {
    const jwt = localStorage.getItem('jwt');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt}`);
    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:8081/api/appliances/delete/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  const handleProfileClick = (userId) => {
    navigate(`/otherProfile/${userId}`);
  };

  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };


  return (
    <Card bg="dark" text="light" className="m-3">
      <Card.Body>
        <Card.Title>
          <span
            onClick={() => handleJobClick(jobId)}
            style={{ cursor: 'pointer' }}
            className="hoverable"
          >
            {jobName} (Outgoing)
          </span>
        </Card.Title>
        <Card.Text>
          Appliant:   <Badge pill bg="primary" > <span onClick={() => handleProfileClick(userId)} style={{ cursor: 'pointer' }}>
            {userName}
          </span></Badge>
        </Card.Text>
        <hr />
        <Card.Text>
          State: {state ? 'Accepted' : 'Pending'}<br />
          CV: {cv}
          <br />
          Letter of recommendation: {letterOfRecommendation}
        </Card.Text>
        {state ? (
          <Card.Text>Accepted</Card.Text>
        ) : (
          <div>
            <Button variant="outline-danger" onClick={handleDelete}>Delete</Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
export default OutgoingApplianceCard;
