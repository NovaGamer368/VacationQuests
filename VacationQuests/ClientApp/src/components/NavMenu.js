import React, { Component, useEffect, useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import NavIcon from './NavIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import PersonAdd from '@mui/icons-material/PersonAdd';


const NavMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        Cookies.remove('UserId')
        window.location.href = '/'
    }


    if (Cookies.get("UserId") === undefined) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar className='bg-primary text-light' position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <NavLink tag={Link} className="nav-item" to="/">Vacation Quests</NavLink>
                        </Typography>
                        <Button color="inherit"><NavLink tag={Link} className="nav-item" to="/">Home</NavLink></Button>
                        <Button color="inherit"><NavLink tag={Link} className="nav-item" to="/Login">Login</NavLink></Button>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
    else {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar className='bg-primary text-light' position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <NavLink tag={Link} className="nav-item" to="/">Vacation Quests</NavLink>
                        </Typography>
                        <Button color="inherit"><NavLink tag={Link} className="nav-item" to="/Create">Create</NavLink></Button>
                        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                            <NavIcon />
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>  
                                <NavLink tag={Link} className="nav-item" to="/Profile">
                                    <div className='d-flex flex-row align-items-center'>
                                        <NavIcon /> Profile
                                    </div>
                                </NavLink>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <NavLink tag={Link} className="nav-item" to="/Profile">

                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </NavLink>
                            </MenuItem>
                            <MenuItem onClick={logout }>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>

                    </Toolbar>
                </AppBar>
            </Box>
        );

    }
}
export default NavMenu; 
