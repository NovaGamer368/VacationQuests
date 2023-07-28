import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const FriendsList = () => {
    const [user, setUser] = useState()
    const [allUsers, setAllUsers] = useState()
    const [friends, setFriends] = useState()
    const [searchKeyWord, setSearchKeyword] = useState('')

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
        if (user) {
            if (user.friends) {
                let tempFriends = []
                user.friends.forEach((friend) => {
                    fetch(`https://localhost:7259/api/users/${friend}`)
                        .then(resp => resp.json())
                        .then(data => {
                            tempFriends.push(data)
                        })
                        .catch(e => console.log(e))
                })
                setFriends(tempFriends)
                console.log("Friends: ", friends)
            }
        }
    }, [user])

    useEffect(() => {
        if (user && allUsers) {
            setLoading(false)
        }
    }, [user, allUsers])

    const onInputChange = (e, value) => {
        console.log(value)
    }


    const addFriend = () => {
        console.log('adding friend')
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
                                <div className='btn btn-success m-auto w-100' onClick={() => { }}>
                                    Add friend
                                </div>
                            </>
                        )}
                    />

                </div>
                <div className='row'>
                    {
                        user.friends ?
                            <>
                            </>
                            :
                            <div>
                                Oh nobody was found! Would you like to find someone?
                            </div>
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