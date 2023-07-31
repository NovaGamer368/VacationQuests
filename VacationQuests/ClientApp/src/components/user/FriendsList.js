import React, { useEffect, useState, useReducer } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const FriendsList = () => {
    const [user, setUser] = useState()
    const [allUsers, setAllUsers] = useState()
    const [filteredAllUsers, setFilteredAllUser] = useState()
    const [validFriend, setValidFriend] = useState(true)
    const [filter, setFilter] = useState()
    const [friends, setFriends] = useState()

    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (Cookies.get("UserId")) {
            fetch(`https://localhost:7259/api/users/${Cookies.get("UserId")}`)
                .then(resp => resp.json())
                .then(data => {
                    setUser(data)
                })
                .catch(e => console.log(e))
        }
        fetch(`https://localhost:7259/api/users`)
            .then(resp => resp.json())
            .then(data => {
                setAllUsers(data)
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        //if (user) {
        //    if (user.friends) {
        //        let tempFriends = []
        //        user.friends.forEach((friend) => {
        //            fetch(`https://localhost:7259/api/users/${friend}`)
        //                .then(resp => resp.json())
        //                .then(data => {
        //                    tempFriends.push(data)
        //                    forceUpdate()
        //                })
        //                .catch(e => console.log(e))
        //        })
        //        setFriends(tempFriends)
        //    }
        //}
    }, [user])

    useEffect(() => {
        if (user && allUsers) {
            let tempFriends = []
            allUsers.forEach((aUser) => {
                user.friends.forEach((friend) => {
                    if (aUser.id === friend) {
                        tempFriends.push(aUser)
                    }
                })
            })
            setFriends(tempFriends)
            setLoading(false)
        }
    }, [user, allUsers])
    useEffect(() => {
        if (friends) {
            console.log(friends)
            forceUpdate()
        }
    }, [friends])

    const onInputChange = (e, value) => {
        console.log(value)
        setFilter(value)
        if (friends) {
            let tempFriendFilter = []
            friends.forEach((friend) => {
                if (friend.email.contains(value)) {
                    tempFriendFilter.push(friend)
                    console.log('pushing ', friend)
                }
            })
        }
    }


    const addFriend = () => {
        setValidFriend(true)
        allUsers.forEach((fUser) => {
            if (fUser.email === filter) {
                //Check if friend is already in friends list
                if (user.friends) {
                    user.friends.forEach((friendId) => {
                        if (fUser.id === friendId) {
                            setValidFriend(false)
                        }
                    })
                }
                //Add friend to both users
                if (validFriend) {
                    console.log('adding friend', fUser)
                    console.log('friend added', user)
                    console.log('Valid Friend')

                    let friendsList = []
                    if (user.friends) {
                        friendsList = user.friends
                    }
                    friendsList.push(fUser.id)

                    let addedTooList = []
                    if (fUser.friends) {
                        addedTooList = fUser.friends
                    }
                    addedTooList.push(user.id)

                    const requestOptions = {
                        mode: 'cors',
                        method: 'PUT',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: user.email,
                            password: user.password,
                            icon: user.icon,
                            bio: user.bio,
                            vacations: user.vacations,
                            othersVacations: user.othersVacations,
                            friends: friendsList
                        }),
                        origin: "https://localhost:44455"
                    };
                    fetch(`https://localhost:7259/api/users/${user.id}`, requestOptions)
                        .then(resp => {
                            const requestOptions = {
                                mode: 'cors',
                                method: 'PUT',
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    email: fUser.email,
                                    password: fUser.password,
                                    icon: fUser.icon,
                                    bio: fUser.bio,
                                    vacations: fUser.vacations,
                                    othersVacations: fUser.othersVacations,
                                    friends: addedTooList
                                }),
                                origin: "https://localhost:44455"
                            };
                            fetch(`https://localhost:7259/api/users/${fUser.id}`, requestOptions)
                                .then(resp => { window.location.reload() })
                                .catch((e) => console.log(e))

                        })
                        .catch((e) => console.log(e))
                }
            }
        })
    }
    const deleteFriend = () => {

    }

    //    onInputChange = {(event, newInputValue) => {
    //    setSelected(newInputValue);
    //}}
    if (!loading) {
        return (
            <div className='container d-flex justify-content-center align-items-center flex-wrap flex-column'>
                <h1>{user.email} friends lists</h1>
                <div className='row bg-secondary p-3'>

                    <Autocomplete
                        sx={{ width: 600 }}
                        filterSelectedOptions
                        disableClearable
                        options={allUsers}
                        getOptionLabel={option => option.email}
                        onInputChange={(e, value) => { onInputChange(e, value) }}
                        renderInput={(params) => (
                            <>
                                <TextField
                                    {...params}
                                    label="Search input"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                                <div className='btn btn-success m-auto w-100' onClick={() => { addFriend() }}>
                                    Add friend
                                </div>
                            </>
                        )}
                    />

                </div>
                <div className='row w-100'>
                    {
                        user.friends ?
                            <div className='d-flex flex-column'>
                                <h3 className='text-center'>Number of Friends is: {user.friends.length}</h3>
                                <div className='row'>
                                    {
                                        friends.map((friend) => (
                                            <div key={friend.id} className='col-4 card p-3 m-1'>
                                                <div className='card-header'>
                                                    <h4>{friend.email}</h4>
                                                </div>
                                                <div className='card-body d-flex justify-content-center align-self-center'>
                                                    <div>
                                                        <Avatar
                                                            className='p-2'
                                                            src={friend.icon}
                                                            sx={{ width: 100, height: 100 }}
                                                        />
                                                    </div>
                                                    <div className='d-flex align-self-center p-3 text-center'>
                                                        {friend.bio}
                                                    </div>
                                                </div>
                                                <div className='card-footer'>
                                                    <div className='d-flex justify-content-center w-100'>
                                                        <div className='btn btn-danger w-auto'>
                                                            Remove Friend
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            :
                            <h3>
                                Oh nobody was found! Would you like to find someone?
                            </h3>
                    }
                </div>

            </div>
        );
    }
    else {
        return (
            <>
                <h3>LOADING</h3>
                <CircularProgress />
            </>
        )
    }

};

export default FriendsList; 