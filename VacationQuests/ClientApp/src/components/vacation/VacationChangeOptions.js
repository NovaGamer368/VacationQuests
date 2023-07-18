import React, { useEffect, useState } from 'react';
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

    const deleteVacation = () => {
        //Delete all events in the vacation
        if (vacation.events) {
            vacation.events.forEach((event) => {
                const requestOptions = {
                    mode: 'cors',
                    method: 'DELETE',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    }),
                    origin: "https://localhost:44455"
                };
                fetch(`https://localhost:7259/api/events/${event.id}`, requestOptions)
                    .catch(e => console.log(e))
            })
        }
        //Delete Vacation ID from profile          
        vacation.planners.forEach((planner) => {
            let fillArray = planner.vacations
            console.log(fillArray)
            if (fillArray) {
                for (let i = 0; i < fillArray.length; i++) {
                    if (fillArray[i] === vacation.id) {
                        console.log('Vacation ID found')
                    }
                }

            }


            //const requestOptions = {
            //    mode: 'cors',
            //    method: 'PUT',
            //    headers: {
            //        'Access-Control-Allow-Origin': '*',
            //        'Content-Type': 'application/json'
            //    },
            //    body: JSON.stringify({
            //        email: planner.email,
            //        password: planner.password,
            //        icon: planner.icon,
            //        bio: planner.bio,
            //        vacations: planner.vacations,
            //        friends: planner.friends
            //    }),
            //    origin: "https://localhost:44455"
            //};
            //fetch(`https://localhost:7259/api/users/${planner.id}`, requestOptions)
            //    .catch(e => console.log(e))
        })
        //Delete vacation itself
    }

    return (
        <>
            <Button className='w-100 h-100' variant="secondary" onClick={handleShow}>
                <i className="bi bi-list"></i>
            </Button>

            <Offcanvas placement={'end'} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="text-center">Edit {vacation.vacationTitle} Options</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='d-flex justify-content-center flex-column'>
                        <div>
                            <button className='btn btn-info w-100 mb-2' onClick={() => setShowUpdate(true)}>Update Vacation</button>
                        </div>
                        <div>
                            <button className='btn btn-danger w-100 mt-auto flex-end' onClick={handleShowDelete}>Delete</button>
                        </div>
                    </div>
                    {
                        showUpdate ?
                            <div className='flex-end mt-5'>
                                <UpdateVacation vacation={vacation} closeUpdate={setShowUpdate} />
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
                                    <Button className='m-1 w-50' variant="danger" onClick={deleteVacation}>
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