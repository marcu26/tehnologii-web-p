import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./profileform.css";
import { Card } from "react-bootstrap";

const ProfileForm = ({ profilePicUrl, username, location, website, coverPhoto, isFriend }) => {
  const navigate = useNavigate();

  const handleMessagesClick = () => {
    navigate("/messages");
  };

  const handleAddFriendClick = () => {
    alert(`Added ${username} as a friend!`);
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
            <p className="m-3">
              <Card.Link href={website}>{website}</Card.Link>
            </p>
            <p style={{ marginTop: "20px", marginBottom: "20px" }}>
              <hr />
              {isFriend ? (
                <Button variant="outline-primary" size="sm" className="m-1" onClick={handleMessagesClick}>
                  Message
                </Button>
              ) : (
                <Button variant="outline-success" size="sm" className="m-1" onClick={handleAddFriendClick}>
                  Add Friend
                </Button>
              )}
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
