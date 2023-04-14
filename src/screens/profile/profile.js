import React from "react";
import Navbar from "../../components/navbar/navbar";
import "./profile.css";
import Postare from "../../components/postare/postare";
import ProfileForm from "../../components/profileform/profileform";
;

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div className="mydivProfile">
          <ProfileForm
            profilePicUrl="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
            username="Marcel Marcel"
            location="Cristelec"
            website="www.ceva.ro"
            coverPhoto="https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZWJvb2slMjBjb3ZlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
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
