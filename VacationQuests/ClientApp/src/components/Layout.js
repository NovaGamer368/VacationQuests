import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavMenu />
                <div className="d-flex justify-content-center">
                    {this.props.children}
                </div>
                <footer className='mt-5'></footer>
            </div>
        );
    }
}
