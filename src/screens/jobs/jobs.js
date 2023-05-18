import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import JobCard from "../../components/jobcard/jobcard";
import ProfileInfo from "../../components/profileinfo/profileinfo";
import FriendList from "../../components/friendlist/friendlist";
import JobPostBar from "../../components/jobpostbar/jobpostbar";
import { Col, Form, Button, FormControl } from 'react-bootstrap';


const Jobs = (props) => {
  const { searchValue } = props;
  const [jobs, setJobs] = useState([]);
  const [titleFilter, setTitleFilter] = useState(null);
  const [companyFilter, setCompanyFilter] = useState(null);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [badgeOptions, setBadgeOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (searchValue != null) {
      setTitleFilter(searchValue);
    }
  }, [searchValue]);


  const handleButtonClick = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const jwt = localStorage.getItem('jwt');
      const response = await fetch("http://localhost:8081/api/jobs/get-filtered", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
          title: titleFilter,
          company: companyFilter,
          skills: selectedBadges
        })
      });

      const result = await response.json();
      setJobs(result);
    };

    fetchJobs();
  }, [titleFilter, companyFilter, selectedBadges]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    fetch("http://localhost:8081/api/skills/get-all", {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    })
      .then(response => response.json())
      .then(data => setBadgeOptions(data))
      .catch(error => console.log(error));
  }, []);

  const handleBadgeChange = (e) => {
    const badgeId = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedBadges(prevSelectedBadges => [...prevSelectedBadges, badgeId]);
    } else {
      setSelectedBadges(prevSelectedBadges => prevSelectedBadges.filter(id => id !== badgeId));
    }
  };

  const ProfileInfoF = () => {
    if (localStorage.getItem('jwt') != null) {
      return (
        <ProfileInfo />
      );
    }
  };

  const Friends = () => {
    if (localStorage.getItem('jwt') != null) {
      return (
        <FriendList />
      );
    }
  };

  const Post = () => {
    if (localStorage.getItem('jwt') != null) {
      return (
        <JobPostBar />
      );
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <div className='leftSide'>
        <ProfileInfoF />
      </div>
      <div className="content">
        <Post />

        <div className="d-flex flex-column bg-dark p-3 rounded my-3">
          <Form onSubmit={handleFilterSubmit}>
            <Col>
              <FormControl
                type="text"
                placeholder="Title"
                className="bg-dark text-white my-1"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Company"
                className="bg-dark text-white my-4"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
              />
            </Col>
            <Col>
              <Button onClick={handleButtonClick} className=" my-2"  variant="outline-info">
                {showOptions ? 'Hide Skills' : 'Show Skills'}
              </Button>
              {showOptions && (
                <div>
                  {badgeOptions.map((badgeOption) => (
                    <Form.Check
                      key={badgeOption.id}
                      type="checkbox"
                      label={badgeOption.title}
                      value={badgeOption.id}
                      checked={selectedBadges.includes(badgeOption.id)}
                      onChange={handleBadgeChange}
                      className="text-white my-2"
                    />
                  ))}
                </div>
              )}
            </Col>
            <Button type="submit" variant="outline-primary">Filter</Button>
          </Form>
        </div>

        {jobs.map((job) => (
          <JobCard
            key={job.id}
            title={job.title}
            company={job.company}
            skills={job.skills}
            image={job.image}
            isMine={job.mine}
            jobId={job.id}
            companyId={job.companyId}
          />
        ))}



      </div>
      <div className="rightSide">
        <Friends />
      </div>
    </div>
  );
};

export default Jobs;
