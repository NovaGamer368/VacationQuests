import React, { useEffect, useState } from 'react';
import { NavLink } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const VacationChangeOptions = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className='w-100 h-100' variant="secondary" onClick={handleShow}>
                        <i class="bi bi-list"></i>
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Edit Vacation Options</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default VacationChangeOptions; 