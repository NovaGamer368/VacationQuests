﻿import React, { useEffect, useState } from 'react';
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
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';


const VacationChangeOptions = ({ vacation }) => {
    const [planners, setPlanners] = useState(null)
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [friends, setFriends] = useState()

    const [userEmail, setUserEmail] = useState("")
    const [addError, setAddError] = useState("")
    const [addValid, setAddValid] = useState(true)

    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showUserManagement, setShowUserManagement] = useState(false)
    const [showAnotherUserSearch, setAnotherUserSearch] = useState(false)
    const [showOtherUsers, setShowOtherUsers] = useState(false)
    const [showLeaveWarning, setShowLeaveWarning] = useState(false)

    const [showAdvancedUser, setShowAdvancedUser] = useState(false)
    const [selectedAdvanced, setSelectedAdvanced] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true)

    const handleCloseManagement = () => setShowUserManagement(false);
    const handleShowManagement = () => setShowUserManagement(true)

    const handleCloseUserSearch = () => setAnotherUserSearch(false);
    const handleShowUserSearch = () => setAnotherUserSearch(true)

    const handleCloseOtherUsers = () => setShowOtherUsers(false);
    const handleShowOtherUsers = () => setShowOtherUsers(true)

    const handleCloseLeaveWarning = () => setShowLeaveWarning(false);
    const handleShowLeaveWarning = () => setShowLeaveWarning(true)

    const navigate = useNavigate();

    const handleCloseAdvancedUser = () => {
        setShowAdvancedUser(false)
        setSelectedAdvanced(null)
    };
    const handleShowAdvancedUser = (user) => {
        setShowAdvancedUser(true)
        setSelectedAdvanced(user)
    }

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

    useEffect(() => {
        //console.log('users', users.length)
        if (users.length !== 0 && currentUser) {
            //console.log("users:", users)
            //console.log(currentUser)
            getFriends()
        }
        forceUpdate()
    }, [users, currentUser])

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
                    console.log(data)
                    let fillArray = data.vacations
                    let othersArray = data.othersVacations
                    if (fillArray) {
                        for (let i = 0; i < fillArray.length; i++) {
                            if (fillArray[i] === vacation.id) {
                                fillArray.splice(i, 1)
                            }
                        }
                    }
                    console.log(othersArray)
                    if (othersArray) {
                        for (let i = 0; i < othersArray.length; i++) {
                            if (othersArray[i] === vacation.id) {
                                othersArray.splice(i, 1)
                            }
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
                            othersVacations: othersArray,
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
                                .then(window.location.href = '/')
                                .catch(e => console.log(e))
                        })
                        .catch(e => console.log(e))
                })
                .catch(e => console.log(e))
        })

    }

    const addUser = () => {
        let tempArr = []
        let userTemp = []
        if (userEmail) {
            setAddError('Please enter a valid email')
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
                                Location: vacation.location,
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

    const kickUser = () => {
        let fillArray = selectedAdvanced.othersVacations
        if (fillArray) {
            for (let i = 0; i < fillArray.length; i++) {
                if (fillArray[i] === vacation.id) {
                    fillArray.splice(i, 1)
                }
            }
        }
        let plannerArr = vacation.planners
        if (plannerArr) {
            for (let i = 0; i < plannerArr.length; i++) {
                if (plannerArr[i] === selectedAdvanced.id) {
                    plannerArr.splice(i, 1)
                }
            }
        }

        const requestOptions = {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: selectedAdvanced.email,
                password: selectedAdvanced.password,
                icon: selectedAdvanced.icon,
                bio: selectedAdvanced.bio,
                vacations: selectedAdvanced.vacations,
                othersVacations: fillArray,
                friends: selectedAdvanced.friends
            }),
            origin: "https://localhost:44455"
        };

        fetch(`https://localhost:7259/api/users/${selectedAdvanced.id}`, requestOptions)
            .then(resp => {
                const requestOptions = {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        VacationTitle: vacation.vacationTitle,
                        Location: vacation.location,
                        events: vacation.events,
                        owner: vacation.owner,
                        planners: plannerArr,
                        startDate: vacation.startDate,
                        endDate: vacation.endDate
                    }),
                    origin: "https://localhost:44455"
                };

                fetch(`https://localhost:7259/api/vacations/${vacation.id}`, requestOptions)
                    .then(resp => { window.location.reload() })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    }

    const leaveVacation = () => {
        let plannerArr = vacation.planners
        let otherVaca = currentUser.othersVacations
        if (plannerArr && otherVaca) {
            plannerArr.forEach((planner, i) => {
                if (planner === currentUser.id) {
                    plannerArr.splice(i, 1)
                }
            })
            otherVaca.forEach((otherVacation, i) => {
                if (otherVacation === vacation.id) {
                    otherVaca.splice(i, 1)
                }
            })


            const requestOptions = {
                mode: 'cors',
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    VacationTitle: vacation.vacationTitle,
                    Location: vacation.location,
                    events: vacation.events,
                    owner: vacation.owner,
                    planners: plannerArr,
                    startDate: vacation.startDate,
                    endDate: vacation.endDate
                }),
                origin: "https://localhost:44455"
            };

            fetch(`https://localhost:7259/api/vacations/${vacation.id}`, requestOptions)
                .then(resp => {
                    const requestOptions = {
                        mode: 'cors',
                        method: 'PUT',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: currentUser.email,
                            password: currentUser.password,
                            icon: currentUser.icon,
                            bio: currentUser.bio,
                            vacations: currentUser.vacations,
                            othersVacations: otherVaca,
                            friends: currentUser.friends
                        }),
                        origin: "https://localhost:44455"
                    };
                    fetch(`https://localhost:7259/api/users/${currentUser.id}`, requestOptions)
                        .then(resp => {
                            navigate('/')
                        })
                        .catch(e => console.log(e))
                })
                .catch(e => console.log(e))
        }
    }

    const promoteUser = () => {

        //Array for the new promotee
        let vacationsArr = []
        if (selectedAdvanced.vacations) {
            vacationsArr = selectedAdvanced.vacations
        }
        let othervacation = selectedAdvanced.othersVacations
        if (othervacation) {
            vacationsArr.push(vacation.id)
            othervacation.forEach((vaca, i) => {
                if (vaca === vacation.id) {
                    othervacation.splice(i, 1)
                }
            })
        }

        //Array for current owner
        let currentVacationArr = []
        if (currentUser.vacations) {
            currentVacationArr = currentUser.vacations
        }
        let currentOtherVacationArr = []
        if (currentUser.othersVacations) {
            currentOtherVacationArr = currentUser.othersVacations
        }

        currentVacationArr.forEach((cVacation, i) => {
            if (cVacation === vacation.id) {
                currentVacationArr.splice(i, 1)
            }
        })
        currentOtherVacationArr.push(vacation.id)

        //Fetch calls to update everything!
        const requestOptions = {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                VacationTitle: vacation.vacationTitle,
                Location: vacation.location,
                events: vacation.events,
                owner: selectedAdvanced.id,
                planners: vacation.planners,
                startDate: vacation.startDate,
                endDate: vacation.endDate
            }),
            origin: "https://localhost:44455"
        };

        //Vacation update
        fetch(`https://localhost:7259/api/vacations/${vacation.id}`, requestOptions)
            .then(resp => {
                //Current user update
                const requestOptions = {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: currentUser.email,
                        password: currentUser.password,
                        icon: currentUser.icon,
                        bio: currentUser.bio,
                        vacations: currentVacationArr,
                        othersVacations: currentOtherVacationArr,
                        friends: currentUser.friends
                    }),
                    origin: "https://localhost:44455"
                };
                fetch(`https://localhost:7259/api/users/${currentUser.id}`, requestOptions)
                    .then(resp => {
                        //New Owner update
                        const requestOptions = {
                            mode: 'cors',
                            method: 'PUT',
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: selectedAdvanced.email,
                                password: selectedAdvanced.password,
                                icon: selectedAdvanced.icon,
                                bio: selectedAdvanced.bio,
                                vacations: vacationsArr,
                                othersVacations: othervacation,
                                friends: selectedAdvanced.friends
                            }),
                            origin: "https://localhost:44455"
                        };
                        fetch(`https://localhost:7259/api/users/${selectedAdvanced.id}`, requestOptions)
                            .then(resp => {
                                window.location.reload()
                            })
                            .catch(e => console.log(e))
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))


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
                    setUsers(tempArr)

                })
            })
            .catch(e => console.log(e))
    }
    const getCurrentUser = () => {
        fetch(`https://localhost:7259/api/users/${Cookies.get("UserId")}`)
            .then(resp => resp.json())
            .then(data => {
                setCurrentUser(data)
            })
            .catch(e => console.log(e))
    }
    const getFriends = () => {
        //console.log(users.length)
        //console.log(currentUser)
        let tempFriends = []
        let loop = 0
        users.forEach((user, index) => {
            if (currentUser.friends) {
                currentUser.friends.forEach((friendID) => {
                    if (user.id === friendID) {
                        tempFriends.push(user)
                        forceUpdate()
                    }
                })
            }
            loop = index + 1
            //console.log(tempFriends, ' array on loop ', loop)

            if (loop === users.length) {
                setFriends(tempFriends)
                //console.log('friends list', tempFriends)
            }
        })

    }
    if (currentUser) {
        if (currentUser.id === vacation.owner) {
            return (
                <>
                    <Button className='w-100 h-100' variant="secondary" onClick={handleShow}>
                        <i className="bi bi-list"></i>
                    </Button>

                    <Offcanvas className='w-50' placement={'end'} show={show} onHide={handleClose}>
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
                                {/*size='lg'*/}
                                <Modal
                                    fullscreen
                                    animation={false}
                                    centered show={show} onHide={handleCloseManagement}>
                                    <Modal.Header className='justify-content-center'>
                                        <h3 className='text-center'>User Management</h3>
                                        <hr></hr>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className='row d-flex justify-content-center col-12 text-center'>
                                            {
                                                planners.map((planner) => (
                                                    <div className='card bg-secondary col-md-2 m-1 text-dark p-3 d-flex flex-column justify-content-center' key={planner.id} onClick={() => handleShowAdvancedUser(planner)}>
                                                        <Avatar
                                                            className='mx-auto'
                                                            src={planner.icon}
                                                            sx={{ width: 100, height: 100 }}
                                                        />
                                                        <div>
                                                            {
                                                                planner.id === vacation.owner ?
                                                                    <span className='text-info'>(Owner) </span> : <></>
                                                            }
                                                            {planner.email}
                                                        </div>
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
                                    animation={false}
                                    backdrop='static'
                                    size='lg'
                                    centered show={show} onHide={handleCloseUserSearch}>
                                    <Modal.Header className='border border-secondary justify-content-center'>
                                        <h3 className='text-center'>Add another</h3>
                                        <hr></hr>
                                    </Modal.Header>
                                    <Modal.Body className=' '>
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
                                        <div className='row text-dark text-center p-2'>
                                            {
                                                friends ?
                                                    <div className='row'>
                                                        {
                                                            friends.map((friend) => (
                                                                <div className='d-flex flex-column col-3' onClick={() => setUserEmail(friend.email)}>
                                                                    <Avatar
                                                                        className='w-auto p-2'
                                                                        src={friend.icon}
                                                                        sx={{ width: 50, height: 50 }}
                                                                    />
                                                                    {friend.email}
                                                                </div>
                                                            ))
                                                        }
                                                    </div> :
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
                    {/*Advanced User*/}
                    {
                        showAdvancedUser ?
                            <>
                                <Modal
                                    animation={false}
                                    backdrop='static'
                                    size='lg'
                                    centered show={show} onHide={handleCloseAdvancedUser}>
                                    <Modal.Header className='border border-secondary text-center'>
                                        <div className='col-1'></div>
                                        <h1 className='mx-auto col-10'>{selectedAdvanced.email}</h1>
                                        <div className='col-1'>
                                            <Tooltip title='Send friend request' arrow>
                                                <IconButton className='text-light'>
                                                    <AddBoxIcon fontSize='large' />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </Modal.Header>
                                    <Modal.Body className='border border-secondary'>
                                        <div className='row mb-3'>
                                            <div className='col-6'>
                                                <img src={selectedAdvanced.icon} />
                                            </div>
                                            <div className='col-6 d-flex align-items-center h-auto'>
                                                <p>{selectedAdvanced.bio}</p>
                                            </div>
                                        </div>
                                        {
                                            selectedAdvanced.id === vacation.owner ?
                                                <></> :
                                                <div className='row'>
                                                    <Button className='col-6 w-50' variant="success" onClick={() => promoteUser()}>
                                                        Make User Owner?
                                                    </Button>
                                                    <Button className='col-6' variant="danger" onClick={() => { kickUser() }}>
                                                        Kick from Vacation
                                                    </Button>
                                                </div>
                                        }

                                    </Modal.Body>
                                    <Modal.Footer className='border border-secondary'>
                                        <div className='d-flex w-100'>
                                            <Button className='m-1 w-100' variant="secondary" onClick={handleCloseAdvancedUser}>
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
        }
        else {

            return (
                <>
                    <Button className='w-100 h-100' variant="secondary" onClick={handleShow}>
                        <i className="bi bi-list"></i>
                    </Button>

                    <Offcanvas placement={'end'} show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title className="text-center">{vacation.vacationTitle} Options</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <div className='d-flex justify-content-center flex-column'>
                                <div>
                                    <button className='btn btn-secondary mb-3 w-100 mt-auto flex-end' onClick={handleShowOtherUsers}>Others in Vacation</button>
                                </div>
                                <div>
                                    <button className='btn btn-danger w-100 mt-auto flex-end' onClick={handleShowLeaveWarning}>Leave Vacation</button>
                                </div>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>
                    {
                        showOtherUsers ?
                            <>
                                <Modal
                                    fullscreen
                                    animation={false}
                                    centered show={show} onHide={handleCloseOtherUsers}>
                                    <Modal.Header className='justify-content-center'>
                                        <h3 className='text-center'>User Management</h3>
                                        <hr></hr>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className='row d-flex justify-content-center col-12 text-center'>
                                            {
                                                planners.map((planner) => (
                                                    <>

                                                        <div className='card bg-secondary col-md-2 m-1 text-dark p-3 d-flex flex-column justify-content-center' key={planner.id} onClick={() => handleShowAdvancedUser(planner)}>

                                                            <Avatar
                                                                className='mx-auto'
                                                                src={planner.icon}
                                                                sx={{ width: 100, height: 100 }}
                                                            />
                                                            <div>
                                                                {
                                                                    planner.id === vacation.owner ?
                                                                        <span className='text-info'>(Owner) </span> : <></>
                                                                }
                                                                {planner.email}
                                                            </div>

                                                        </div>
                                                    </>
                                                ))
                                            }
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className='d-flex w-100'>
                                            <Button className='m-1 w-100' variant="secondary" onClick={handleCloseOtherUsers}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>
                            </> : <>
                            </>
                    }
                    {
                        showLeaveWarning ?
                            <>
                                <Modal
                                    size="lg"
                                    centered show={show} onHide={handleCloseLeaveWarning}>
                                    <Modal.Header className='justify-content-center'>
                                        <h3 className='text-center'>Leaving <b className='text-danger'>{vacation.vacationTitle}</b></h3>
                                    </Modal.Header>
                                    <Modal.Body className='text-center'>
                                        You are leaving <b>{vacation.vacationTitle}</b>, you can get re-invited if you do but you will no longer see this vacation anymore? Are you sure you want to leave?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className='d-flex w-100'>
                                            <Button className='m-1 w-50' variant="danger" onClick={() => { leaveVacation() }}>
                                                Leave
                                            </Button>
                                            <Button className='m-1 w-50' variant="secondary" onClick={handleCloseLeaveWarning}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>
                            </>
                            :
                            <></>
                    }
                    {
                        showAdvancedUser ?
                            <>
                                <Modal
                                    animation={false}
                                    backdrop='static'
                                    size='lg'
                                    centered show={show} onHide={handleCloseAdvancedUser}>
                                    <Modal.Header className='border border-secondary text-center'>
                                        <div className='col-1'></div>
                                        <h1 className='mx-auto col-10'>{selectedAdvanced.email}</h1>
                                        <div className='col-1'>
                                            <Tooltip title='Send friend request' arrow>
                                                <IconButton className='text-light'>
                                                    <AddBoxIcon fontSize='large' />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </Modal.Header>
                                    <Modal.Body className='border border-secondary'>
                                        <div className='row mb-3'>
                                            <div className='col-6'>
                                                <img src={selectedAdvanced.icon} />
                                            </div>
                                            <div className='col-6 d-flex align-items-center h-auto'>
                                                <p>{selectedAdvanced.bio}</p>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer className='border border-secondary'>
                                        <div className='d-flex w-100'>
                                            <Button className='m-1 w-100' variant="secondary" onClick={handleCloseAdvancedUser}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>
                            </> : <>
                            </>
                    }
                </>
            )
        }
    }
    else {
        return (
            <>
                <Button className='w-100 h-100' variant="secondary" onClick={handleShow}>
                    <i className="bi bi-list"></i>
                </Button>

                <Offcanvas placement={'end'} show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className="text-center">{vacation.vacationTitle} Options</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className='d-flex align-self-center h-100'>
                            <h3>LOADING</h3>
                            <CircularProgress />
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </>)
    }
};

export default VacationChangeOptions; 