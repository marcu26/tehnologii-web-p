import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";



function SearchBar() {
    
    const navigate = useNavigate();

    const handleJobsClick = () => {
        navigate('/jobs');
      };
    
    return (
        <Form className="d-flex px-2" >
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />
            <Button variant="outline-light" onClick={handleJobsClick}>Search</Button>
        </Form>

    );
}
export default SearchBar
