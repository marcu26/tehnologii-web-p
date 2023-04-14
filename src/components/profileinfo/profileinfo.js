import React from 'react';
import { Card, Image } from 'react-bootstrap';


function ProfileInfo() {
  return (
    <Card bg="dark" text="white" className='m-3'>
      <Card.Body>
        <Image src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" roundedCircle className="mb-3" width="100" height="100" />
        <h4>John Doe</h4>
        <p>Email: johndoe@example.com</p>
      </Card.Body>
    </Card>
  );
}

export default ProfileInfo;
