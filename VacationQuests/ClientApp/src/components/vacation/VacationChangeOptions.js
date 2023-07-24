import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import UpdateVacation from './UpdateVacation';
import Avatar from '@mui/material/Avatar';


const VacationChangeOptions = ({ vacation }) => {
    const [planners, setPlanners] = useState()

    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showUserManagement, setShowUserManagement] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true)

    const handleCloseManagement = () => setShowUserManagement(false);
    const handleShowManagement = () => setShowUserManagement(true)

    useEffect(() => {
        getPlanners()
    }, [])

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
                    origin: "https://localhost:44455"
                };
                fetch(`https://localhost:7259/api/events/${event}`, requestOptions)
                    .catch(e => console.log(e))
            })
        }
        //Delete Vacation ID from profile          
        vacation.planners.forEach((planner) => {
            fetch(`https://localhost:7259/api/users/${planner}`)
                .then(resp => resp.json())
                .then(data => {
                    let fillArray = data.vacations
                    if (fillArray) {
                        for (let i = 0; i < fillArray.length; i++) {
                            if (fillArray[i] === vacation.id) {
                                fillArray.splice(i, 1)
                            }
                        }
                        //Updating with different list
                        const requestOptions = {
                            mode: 'cors',
                            method: 'PUT',
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: data.email,
                                password: data.password,
                                icon: data.icon,
                                bio: data.bio,
                                vacations: fillArray,
                                othersVacations: data.othersVacations,
                                friends: data.friends
                            }),
                            origin: "https://localhost:44455"
                        };

                        fetch(`https://localhost:7259/api/users/${planner}`, requestOptions)
                            .then(resp => {
                                const requestOptions = {
                                    mode: 'cors',
                                    method: 'DELETE',
                                    headers: {
                                        'Access-Control-Allow-Origin': '*',
                                        'Content-Type': 'application/json'
                                    },
                                    origin: "https://localhost:44455"
                                };
                                fetch(`https://localhost:7259/api/vacations/${vacation.id}`, requestOptions)
                                    .then(window.location.href = '/').catch(e => console.log(e))
                            })
                            .catch(e => console.log(e))
                    }
                })
                .catch(e => console.log(e))
        })
    }

    const getPlanners = () => {
        let tempArr = []
        vacation.planners.forEach((planner) => {
            fetch(`https://localhost:7259/api/users/${planner}`)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    tempArr.push(data)
                })
                .catch(e => console.log(e))
        })
        setPlanners(tempArr)

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
                            <button className='btn btn-primary w-100 mt-auto mb-2' onClick={handleShowManagement}>Manage Users</button>
                        </div>
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
            {/*Delete Vacation Modal*/ }
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
            {/*Manage Users Modal*/}
            {
                showUserManagement ? 
                    <>
                        <Modal
                            size='lg'
                            centered show={show} onHide={handleCloseManagement}>
                            <Modal.Header className='justify-content-center'>
                                <h3 className='text-center'>User Management</h3>
                                <hr></hr>
                            </Modal.Header>
                            <Modal.Body>
                                <div className='row d-flex justify-content-center'>
                                    {
                                        planners.map((planner) => (
                                            <div className='card bg-secondary col-1 text-dark p-3 d-flex flex-column justify-content-center w-auto' key={planner.id}>
                                                <Avatar
                                                    className='mx-auto'
                                                    src={ planner.icon }
                                                    sx={{ width: 100, height: 100 }}
                                                />
                                                {planner.email}

                                            </div>
                                        ))
                                    }
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className='d-flex'>                                    
                                    <Button className='m-1' variant="secondary" onClick={handleCloseManagement}>
                                        Cancel
                                    </Button>
                                </div>
                            </Modal.Footer>
                        </Modal>
                    </> : <>
                        </>
            }

        </>
    );
};

export default VacationChangeOptions; 