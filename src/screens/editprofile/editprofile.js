import React, { useState, useEffect } from "react";
import Navbar from '../../components/navbar/navbar';
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import "./editprofile.css"
import { useNavigate } from "react-router-dom";

const EditProfile = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    };

    fetch(`http://localhost:8081/api/users/get-user`, requestOptions)
      .then(response => response.json())
      .then(result => setUser(result))
      .catch(error => console.log('error', error));
  }, []);

  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");

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

  const handlePhotoChange = (event) => {
    setPhoto(event.target.value);
  };

  const handleCoverPhotoChange = (event) => {
    setCoverPhoto(event.target.value);
  };


  const Update = (event) => {
    var myHeaders = new Headers();
    const jwt = localStorage.getItem('jwt');


    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${jwt}`);
    
    var raw = JSON.stringify({
      "username": username,
      "website": website,
      "location": location,
      "photo": photo,
      "coverPhoto":coverPhoto
    });
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8081/api/users/update-user", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

      navigate("/profile")
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
                  src={user.photo}
                  roundedCircle
                  className="userPic m-3"
                />

                <Form.Group controlId="postImage">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Photo (for the moment hotlink)"
                    value={photo}
                    onChange={handlePhotoChange}
                  />
                </Form.Group>

                <Form.Group controlId="postImage">
                  <Form.Label>Cover photo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cover photo (for the moment hotlink)"
                    value={coverPhoto}
                    onChange={handleCoverPhotoChange}
                  />
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

                  <Button variant="primary" type="submit" className="my-4" onClick={Update}>
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
