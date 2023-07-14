import React, { useEffect, useState } from 'react';
import { NavLink } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import UpdateVacation from './UpdateVacation';


const VacationChangeOptions = ({ vacation }) => {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true)

    return (
        <>
            <Button className='w-100 h-100' variant="secondary" onClick={handleShow}>
                <i class="bi bi-list"></i>
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="text-center">Edit {vacation.vacationTitle} Options</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='d-flex justify-content-center flex-column'>
                        <div>
                            <button className='btn btn-info w-100 mb-2' onClick={() => setShowUpdate(true) }>Update Vacation</button>
                        </div>
                        <div>
                            <button className='btn btn-danger w-100 mt-auto flex-end' onClick={ handleShowDelete }>Delete</button>
                        </div>
                    </div>
                    {
                        showUpdate ?
                            <div className='flex-end mt-5'>
                                <UpdateVacation vacation={ vacation } />
                            </div>
                            :
                            <></>
                    }
                </Offcanvas.Body>
            </Offcanvas>
            {
                showDelete ?
                    <>
                        <Modal 
                            size="lg"
                            centered show={show} onHide={handleCloseDelete}>
                            <Modal.Header className='justify-content-center'>
                                <h3 className='text-center'>DELETING <b className='text-danger'>{vacation.vacationTitle}</b></h3>
                            </Modal.Header>
                            <Modal.Body>
                                This vacation will be lost <b className='text-danger'>forever </b>with the events included are you sure you want to <b className='text-danger'>delete the vacation?</b>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className='d-flex w-100'>
                                    <Button className='m-1 w-50' variant="danger" onClick={handleCloseDelete}>
                                        Confirm Delete
                                    </Button>
                                    <Button className='m-1 w-50' variant="secondary" onClick={handleCloseDelete}>
                                        Cancel
                                    </Button>
                                </div>
                            </Modal.Footer>
                        </Modal>
                    </>
                    :
                    <></>
            }
        </>
    );
};

export default VacationChangeOptions; 