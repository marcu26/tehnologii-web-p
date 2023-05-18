import React, { useState, useEffect} from "react";
import Navbar from "../../components/navbar/navbar";
import "./profile.css";
import Postare from "../../components/postare/postare";
import ProfileForm from "../../components/profileform/othersProfileform";
import { useParams } from 'react-router-dom';



const OtherProfile = () => {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    var userIdI = parseInt(userId)

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    };

    fetch(`http://localhost:8081/api/users/get-user/${userIdI}`, requestOptions)
      .then(response => response.json())
      .then(result => setUser(result))
      .catch(error => console.log('error', error));
  }, [userId]);

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
            isFriend={user.friend}
          />
        </div>
      </div>
      <div>
        <div className="leftSide"></div>
        <div className="content">
          <Postare
            name={user.username}
            profilePicUrl={user.photo}
            postText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna sit amet urna aliquet, a fermentum velit auctor. Sed id ipsum vel enim tempus efficitur. Ut eu ultrices nunc. Proin at risus in justo consequat rutrum."
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

export default OtherProfile;
