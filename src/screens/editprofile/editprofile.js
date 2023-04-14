import React, { useState } from "react";
import Navbar from '../../components/navbar/navbar';
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import "./editprofile.css"

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <div className="mydivEditProfile">
        <div className="editpbackground m-4" rounded>
          <Container className="bg-dark rounded">
            <Row className="d-flex justify-content-center">
              <Col md={10}>
                <Image
                  src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                  roundedCircle
                  className="userPic m-3"
                />

                <Form.Group controlId="postImage">
                  <Form.Label>Profile pic</Form.Label>
                  <Form.Control type="file" className="bg-dark text-white" />
                </Form.Group>


                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your location"
                      value={location}
                      onChange={handleLocationChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="website">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your website"
                      value={website}
                      onChange={handleWebsiteChange}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="my-4">
                    Save Changes
                  </Button>

                  <hr></hr>

                  <Form.Group controlId="oldPassword">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your old password"
                      value={oldPassword}
                      onChange={handleOldPasswordChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="my-4">
                    Change password
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
