import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import ProfileInfo from '../../components/profileinfo/profileinfo';
import FriendList from '../../components/friendlist/friendlist';
import IncomingApplianceCard from '../../components/appliancecard/incomingApplianceCard';
import OutgoingApplianceCard from '../../components/appliancecard/outgoingApplianceCard';

function Appliances() {
  const [incomingAppliances, setIncomingAppliances] = useState([]);
  const [outgoingAppliances, setOutgoingAppliances] = useState([]);

  useEffect(() => {
    const fetchIncomingAppliances = () => {
      const jwt = localStorage.getItem('jwt');
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${jwt}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://localhost:8081/api/appliances/get-received", requestOptions)
        .then(response => response.json())
        .then(result => setIncomingAppliances(result))
        .catch(error => console.log('error', error));
    };

    const fetchOutgoingAppliances = () => {
      const jwt = localStorage.getItem('jwt');
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${jwt}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://localhost:8081/api/appliances/get-applied", requestOptions)
        .then(response => response.json())
        .then(result => setOutgoingAppliances(result))
        .catch(error => console.log('error', error));
    };

    fetchIncomingAppliances();
    fetchOutgoingAppliances();
  }, []);

  const ProfileInfoF = () => {
    if (localStorage.getItem('jwt') != null) {
      return (
        <ProfileInfo />
      );
    }
    return null;
  };

  const Friends = () => {
    if (localStorage.getItem('jwt') != null) {
      return (
        <FriendList />
      );
    }
    return null;
  };

  return (
    <div className='wrapper'>
      <Navbar />
      <div className='leftSide'>
        <ProfileInfoF />
      </div>
      <div className='content'>
        {incomingAppliances.map(appliance => (
          <IncomingApplianceCard
            key={appliance.id}
            id={appliance.id}
            jobName={appliance.jobName}
            jobId={appliance.jobId}
            userName={appliance.userName}
            userId={appliance.userId}
            state={appliance.state}
            cv={appliance.cv}
            letterOfRecommendation={appliance.letterOfRecommendation}
          />
        ))}
        {outgoingAppliances.map(appliance => (
          <OutgoingApplianceCard
            key={appliance.id}
            id={appliance.id}
            state={appliance.state}
            jobName={appliance.jobName}
            jobId={appliance.jobId}
            userName={appliance.userName}
            userId={appliance.userId}
            cv={appliance.cv}
            letterOfRecommendation={appliance.letterOfRecommendation}
          />
        ))}
      </div>
      <div className='rightSide'>
        <Friends />
      </div>
    </div>
  );
}

export default Appliances;
