import React, { Component } from 'react';
// import {State, Navigation} from 'react-router';
import { Navbar, NavbarBrand, Glyphicon, Col, Row } from 'react-bootstrap';

export default class Header extends Component {
    render() {
        return (
            <div>
                <Navbar staticTop={true} fluid={true} fixedTop={true}>
                    <Navbar.Header>
                        <NavbarBrand>
                            <Row>
                                <Col md={3} sm={3}>
                                    <Glyphicon glyph="glyphicon glyphicon-tree-deciduous" />
                                </Col>
                                <Col md={9} sm={9}>
                                    FURA
                                </Col>
                            </Row>
                        </NavbarBrand>
                    </Navbar.Header>
                </Navbar>
            </div>
        );
    }

}