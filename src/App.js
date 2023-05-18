import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import React from 'react';

import Login from './screens/login/login';
import Home from './screens/home/home'
import SignIn from './screens/signIn/signIn';
import Messages from './screens/messages/messages';
import Jobs from './screens/jobs/jobs'
import Profile from './screens/profile/profile';
import EditProfile from './screens/editprofile/editprofile';
import Footer from './components/footer/footer';
import AdminDashboard from './screens/dashboard/dashboard';
import JobPosting from './screens/job/job';
import OtherProfile from './screens/profile/othersProfile';
import Appliances from './screens/appliances/appliances';

function App() {
  return (
    <div>
    <div className='wrapper'>
      <div className='contentApp'>
        <Router>
          <Routes>
          <Route path='/otherProfile/:userId' element={<OtherProfile />} />
            <Route path='/dashboard' element={<AdminDashboard />} />
            <Route path='/appliances' element={<Appliances />} />
            <Route path='/editprofile' element={<EditProfile />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/jobs' element={<Jobs />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/login' element={<Login />} />
            <Route path='/job/:jobId' element={<JobPosting/>} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </div>
    </div>
  );
}

export default App;
