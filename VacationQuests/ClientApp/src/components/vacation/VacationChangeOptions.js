import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import UpdateVacation from './UpdateVacation';
import Avatar from '@mui/material/Avatar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'
import Cookies from 'js-cookie';
import { useReducer } from 'react';



const VacationChangeOptions = ({ vacation }) => {
    const [planners, setPlanners] = useState()
    const [users, setUsers] = useState()
    const [currentUser, setCurrentUser] = useState()

    const [userEmail, setUserEmail] = useState("")
    const [addError, setAddError] = useState("")
    const [addValid, setAddValid] = useState(true)

    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showUserManagement, setShowUserManagement] = useState(false)
    const [showAnotherUserSearch, setAnotherUserSearch] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true)

    const handleCloseManagement = () => setShowUserManagement(false);
    const handleShowManagement = () => setShowUserManagement(true)

    const handleCloseUserSearch = () => setAnotherUserSearch(false);
    const handleShowUserSearch = () => setAnotherUserSearch(true)

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        getPlanners()
        getUsers()
        getCurrentUser()
        setAddValid(true)

    }, [])

    useEffect(() => {
        setAddValid(true)
    }, [userEmail])

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


    const addUser = () => {
        let tempArr = []
        let userTemp = []
        if (userEmail) {
            setAddError(userEmail)
            //Search for users email in users useState
            //If found add the found users ID to vacation planners and update their "othersVacations" array with the current vacations ID
            users.forEach((user) => {
                if (user.email === userEmail) {
                    vacation.planners.forEach((planner) => {
                        if (planner === user.id) {
                            setAddError('User is already in the vacation')
                            setAddValid(false)
                            setAddValid(...addValid)
                            forceUpdate()
                        }
                    })
                    if (addValid) {
                        tempArr = vacation.planners
                        setAddError('')
                        console.log('valid user')
                        tempArr.push(user.id)

                        const requestOptions = {
                            mode: 'cors',
                            method: 'PUT',
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                VacationTitle: vacation.vacationTitle,
                                events: vacation.events,
                                owner: vacation.owner,
                                planners: tempArr,
                                startDate: vacation.startDate,
                                endDate: vacation.endDate
                            }),
                            origin: "https://localhost:44455"
                        };
                        fetch(`https://localhost:7259/api/vacations/${vacation.id}`, requestOptions)
                            .then(resp => console.log(resp))
                            .then(data => {
                                console.log('data', data)
                                if (user.othersVacations) {
                                    userTemp = user.othersVacations
                                }
                                userTemp.push(vacation.id)
                                console.log(userTemp)
                                const requestOptions2 = {
                                    mode: 'cors',
                                    method: 'PUT',
                                    headers: {
                                        'Access-Control-Allow-Origin': '*',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        Email: user.email,
                                        Password: user.password,
                                        Icon: user.icon,
                                        Bio: user.bio,
                                        Vacations: user.vacations,
                                        OthersVacations: userTemp,
                                        Friends: user.friends
                                    }),
                                    origin: "https://localhost:44455"
                                };
                                fetch(`https://localhost:7259/api/users/${user.id}`, requestOptions2)
                                    .then(window.location.reload())
                                    .catch(e => console.log(e))
                            })
                            .catch(e => console.log(e))
                    }
                }
            })


        }
        else {
            setAddError("Please select a users email")
        }
    }

    const getPlanners = () => {
        let tempArr = []
        vacation.planners.forEach((planner) => {
            fetch(`https://localhost:7259/api/users/${planner}`)
                .then(resp => resp.json())
                .then(data => {
                    tempArr.push(data)
                })
                .catch(e => console.log(e))
        })
        setPlanners(tempArr)
    }

    const getUsers = () => {
        let tempArr = []
        fetch(`https://localhost:7259/api/users`)
            .then(resp => resp.json())
            .then(data => {
                data.forEach((user) => {
                    tempArr.push(user)
                })
            })
            .catch(e => console.log(e))
        setUsers(tempArr)
    }

    const getCurrentUser = () => {
        fetch(`https://localhost:7259/api/users/${Cookies.get("UserId")}`)
            .then(resp => resp.json())
            .then(data => {
                setCurrentUser(data)
            })
            .catch(e => console.log(e))
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
            {/*Delete Vacation Modal*/}
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
                            fullscreen
                            centered show={show} onHide={handleCloseManagement}>
                            <Modal.Header className='justify-content-center'>
                                <h3 className='text-center'>User Management</h3>
                                <hr></hr>
                            </Modal.Header>
                            <Modal.Body>
                                <div className='row d-flex justify-content-center col-12 text-center'>
                                    {
                                        planners.map((planner) => (
                                            <div className='card bg-secondary col-md-2 m-1 text-dark p-3 d-flex flex-column justify-content-center' key={planner.id}>
                                                <Avatar
                                                    className='mx-auto'
                                                    src={planner.icon}
                                                    sx={{ width: 100, height: 100 }}
                                                />
                                                {planner.email}

                                            </div>
                                        ))
                                    }
                                    <div className='card bg-secondary col-md-2 m-1 text-dark p-3 d-flex flex-column justify-content-center' onClick={handleShowUserSearch}>
                                        <PersonAddIcon
                                            className='mx-auto'
                                            sx={{ width: 100, height: 100 }}
                                        />
                                        Add another?

                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className='d-flex w-100'>
                                    <Button className='m-1 w-100' variant="secondary" onClick={handleCloseManagement}>
                                        Cancel
                                    </Button>
                                </div>
                            </Modal.Footer>
                        </Modal>
                    </> : <>
                    </>
            }
            {/*Another User Search*/}
            {
                showAnotherUserSearch ?
                    <>
                        <Modal
                            backdrop='static'
                            size='lg'
                            centered show={show} onHide={handleCloseUserSearch}>
                            <Modal.Header className='border border-secondary justify-content-center'>
                                <h3 className='text-center'>Add another</h3>
                                <hr></hr>
                            </Modal.Header>
                            <Modal.Body className='bg-primary'>
                                <div className='text-danger text-center'>{addError}</div>
                                <div className='row'>
                                    <Autocomplete
                                        id="free-solo-demo"
                                        freeSolo
                                        inputValue={userEmail}
                                        onInputChange={(event, newInputValue) => {
                                            setUserEmail(newInputValue);
                                        }}
                                        options={users.map((user) => user.email)}
                                        renderInput={(params) => <TextField {...params} label="Search for Another user" />}
                                    />
                                </div>
                                <div className='row text-light text-center p-2'>
                                    {
                                        currentUser.friends ?
                                            <>
                                                {
                                                    currentUser.friends.map((friend) => (
                                                        <div>
                                                            {friend}
                                                        </div>
                                                    ))
                                                }
                                            </> :
                                            <h4>YOU HAVE NO FRIENDS</h4>
                                    }
                                </div>


                            </Modal.Body>
                            <Modal.Footer className='border border-secondary'>
                                <div className='d-flex w-100'>
                                    <Button className='m-1 w-50' variant="primary" onClick={addUser}>
                                        Add
                                    </Button>
                                    <Button className='m-1 w-50' variant="secondary" onClick={handleCloseUserSearch}>
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