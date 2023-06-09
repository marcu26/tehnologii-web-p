import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import "./profile.css";
import Postare from "../../components/postare/postare";
import ProfileForm from "../../components/profileform/profileform";
;

const Profile = () => {
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


  return (
    <div>
      <Navbar />
      <div>
        <div className="mydivProfile">
          <ProfileForm
            profilePicUrl={user.photo}
            username={user.username}
            location={user.location}
            website={user.website}
            coverPhoto={user.coverPhoto}
          />
        </div>
      </div>
      <div>
        <div className="leftSide"></div>
        <div className="content">
          <Postare
            name="Marcel Marcel"
            profilePicUrl=""
            postText="Caut de munca."
            timeAgo="2 days ago"
            postImages={[
            "https://uspto.report/TM/90730892/mark.png"
            ]}
            likes="2000"
          />
        </div>
        <div className="rightSide"></div>
      </div>
    </div>
  );
};

export default Profile;
