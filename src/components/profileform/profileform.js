import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './profileform.css'

const ProfileForm = ({ profilePicUrl, username, location, website, coverPhoto }) => {
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate('/editprofile');
  };

  const handleMessagesClick = () => {
    navigate('/messages');
  };

  return (
    <div className="profile_background m-4" rounded>
      <Container className="bg-dark rounded">
        <Row>
          <Col md={4}>
            <Image src={profilePicUrl} roundedCircle className="userPic m-3" />
            <h2 style={{ marginTop: "20px", marginBottom: "20px" }} className="m-3">
              {username}
            </h2>
            <p className="m-3">{location}</p>
            <p className="m-3">{website}</p>
            <p style={{ marginTop: "20px", marginBottom: "20px" }}>
              <hr></hr>
              <Button variant="outline-primary" size="sm" className="m-1" onClick={handleEditProfileClick}>
                Edit Profile
              </Button>
              <Button variant="outline-primary" size="sm" className="m-1">
                Add Section
              </Button>
              <Button variant="outline-success" size="sm" className="m-1" onClick={handleMessagesClick}>
                Message
              </Button>
            </p>
          </Col>
          <Col md={8}>
          <div className="d-flex justify-content-center">
              <Image src={coverPhoto} className="backgroundphoto" />
          </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileForm;
