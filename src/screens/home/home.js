import * as React from 'react';
import Navbar from '../../components/navbar/navbar';
import Postare from '../../components/postare/postare';
import './home.css'
import MyPostBar from '../../components/postbar/postbar'
import isLoggedIn from '../../GlobalVars/IsLoggedIn';
import ProfileInfo from '../../components/profileinfo/profileinfo';
import FriendList from '../../components/friendlist/friendlist';


function Home() {

  const PostBar = () => 
  {
    if (isLoggedIn.value === "1") 
    {
      return (
        <MyPostBar/>
      );
    }
  }

  const ProfileInfoF = () => 
  {
    if (isLoggedIn.value === "1") 
    {
      return (
        <ProfileInfo/>
      );
    }
  }

  const Friends = () => 
  {
    if (isLoggedIn.value === "1") 
    {
      return (
        <FriendList/>
      );
    }
  }

  return (
    <div className='wrapper'>
      <Navbar />
      <div className='leftSide'>  <ProfileInfoF/> </div>
      <div className='content'>
      <div>
        <PostBar/>
      </div>
        <Postare
          name="Primul om"
          profilePicUrl=""
          postText="Ce bine sa nu lucrezi... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet turpis non risus sollicitudin tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
          timeAgo="2 days ago"
          postImages={[
          ]}
          likes="1"
        />

        <Postare
          name="Prima firma"
          profilePicUrl=""
          postText="Aici o sa lucrezi la noi daca vii la noi si nu mergi la altii."
          timeAgo="2 days ago"
          postImages={[
            "https://target.scene7.com/is/image/Target/desks_SBL-Shape-SB-210908-1631102260329?wid=668&qlt=80&fmt=webp"
          ]}
          likes="2000"
        />

        <Postare
          name="Carusel"
          profilePicUrl=""
          postText="Apa bei, apa play."
          timeAgo="2 days ago"
          postImages={[
            "https://www.heritageoffice.com/wp-content/uploads/sites/513/2022/04/hybrid-workplace-collaboration-3.png",
            "https://i.ytimg.com/vi/eHjZYPwKtFs/maxresdefault.jpg"
          ]}
          likes="2000"
        />
      </div>


      <div className='rightSide'><Friends/></div>
    </div>
  );
}
export default Home
