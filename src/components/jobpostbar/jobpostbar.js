import React, { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import NewPostModal from '../../components/jobpostform/jobpostform';

function JobPostBar() {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="d-flex flex-column bg-dark p-3 rounded my-3">
            <InputGroup className="mb-3">
                <FormControl as="textarea" placeholder="Job title..." className="bg-dark text-white" />
            </InputGroup>

            <div>
                <Button variant="outline-primary" className="mx-1" onClick={handleShowModal}>
                    Post a Job
                </Button>
            </div>
            <NewPostModal showModal={showModal} handleCloseModal={handleCloseModal} />
        </div>
    );
}

export default JobPostBar;
