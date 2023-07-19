import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import UpdateVacation from './UpdateVacation';


const DeleteEvent = ({ selectedEvent, vacation }) => {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    const deleteEvent = () => {
        let fillArray = vacation.events
        console.log('before ', fillArray)

        for (let i = 0; i < fillArray.length; i++) {
            if (fillArray[i] === selectedEvent.id) {
                fillArray.splice(i, 1)
            }
        }
        console.log('after ', fillArray)
        const requestOptions = {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                vacationTitle: vacation.vacationTitle,
                events: fillArray,
                planners: vacation.planners,
                startDate: vacation.startDate,
                endDate: vacation.endDate,
            }),
            origin: "https://localhost:44455"
        };
        fetch(`https://localhost:7259/api/vacations/${vacation.id}`, requestOptions)
            .then(resp => {
                if (resp.status === 200) {
                    const requestOptions = {
                        mode: 'cors',
                        method: 'DELETE',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        },
                        origin: "https://localhost:44455"
                    };
                    fetch(`https://localhost:7259/api/events/${selectedEvent.id}`, requestOptions)
                        .then(resp => { navigate(-1) })
                        .catch(e => console.log(e))
                }
            })
            .catch(e => console.log(e))

    }

    return (
        <>
            <Button className='btn btn-danger col-1 m-auto' variant="primary" onClick={handleShow}>
                <i class="bi bi-trash"></i>
            </Button>

            <Modal size="lg" show={show} centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <h3 className='text-center'>DELETING <b className='text-danger'>{selectedEvent.eventName}</b></h3>
                </Modal.Header>
                <Modal.Body>
                    This event will be lost <b className='text-danger'>forever </b> are you sure you want to <b className='text-danger'>delete the event?</b>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex w-100'>
                        <Button className='m-1 w-50' variant="danger" onClick={deleteEvent}>
                            Confirm Delete
                        </Button>
                        <Button className='m-1 w-50' variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteEvent; 