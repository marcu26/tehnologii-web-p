import React from "react"
import Navbar from "../../components/navbar/navbar";
import JobCard from "../../components/jobcard/jobcard";
import ProfileInfo from "../../components/profileinfo/profileinfo";
import FriendList from "../../components/friendlist/friendlist";
import JobPostBar from "../../components/jobpostbar/jobpostbar";
import isLoggedIn from "../../GlobalVars/IsLoggedIn";


const Jobs = () => {
  const job1 = {
    company: 'Acme Corporation',
    title: 'Software Engineer',
    skills: ['JavaScript', 'React', 'Node.js'],
    image: 'https://i0.wp.com/www.iedunote.com/img/23559/what-is-a-company-scaled.jpg',
  };

  const job2 = {
    company: 'Company',
    title: 'Front end developer',
    skills: ['JavaScript', 'React', 'Node.js'],
    image: 'https://blog.ipleaders.in/wp-content/uploads/2017/05/iPleaders-12.jpg',
  };

  const ProfileInfoF = () => {
    if (isLoggedIn.value === "1") {
      return (
        <ProfileInfo />
      );
    }
  }

  const Friends = () => {
    if (isLoggedIn.value === "1") {
      return (
        <FriendList />
      );
    }
  }

  const Post = () => {
    if (isLoggedIn.value === "1") {
      return (
        <JobPostBar/>
      );
    }
  }

  return (<div>
    <Navbar />
    <div className='leftSide'>  <ProfileInfoF /></div>
    <div className="content">
      <Post/>
      <JobCard {...job1} />
      <JobCard {...job2} />
      <JobCard {...job1} />
      <JobCard {...job2} />
      <JobCard {...job1} />
    </div>
    <div className="rightSide"> <Friends /></div>
  </div>)
}
export default Jobs