import React, { Component, useEffect, useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import Cookies from 'js-cookie';
import NavIcon from './NavIcon';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {       
        if (Cookies.get("UserId") === undefined) {
            return (
                <header>
                    <Navbar className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                        <NavbarBrand tag={Link} to="/">VacationQuests</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem className="nav-item">
                                    <NavLink tag={Link} className="nav-item" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem className="nav-item">
                                    <NavLink tag={Link} className="nav-item" to="/Login">Login</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Navbar>
                </header>
            );
        }
        else {
            return (
                <header>
                    <Navbar className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                        <NavbarBrand tag={Link} to="/">VacationQuests</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem className="nav-item">
                                    <NavLink tag={Link} className="nav-item" to="/Profile"><NavIcon /> Profile</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Navbar>
                </header>
            );
        }
    }
}
