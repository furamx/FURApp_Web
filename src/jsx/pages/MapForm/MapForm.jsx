import React, { Component } from 'react';
// import { Panel, PageHeader, PanelGroup, Button, Image, DropdownButton, MenuItem, Row, Col } from 'react-bootstrap';
import { Panel, PageHeader, PanelGroup } from 'react-bootstrap';

import './MapForm.css';
// import addIcon from './../../../Images/Icons/add_1x.png';
import MyMap from './../MapComponent/MapComponent';


export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelTitle: "Mapa",
            dropdownTitle: "Eventos"
        }
    }

    componentWillMount() {
        
    }
    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <PageHeader className="PageHeader">Zonas <small>Mis zonas</small></PageHeader>
                <PanelGroup accordion id="accordion-example" className="Panel">
                    <Panel eventKey="1" bsStyle="success">
                        <Panel.Heading className="PanelHeader">
                            <Panel.Title toggle>{this.state.panelTitle}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <MyMap/>
                        </Panel.Body>
                    </Panel>
                    {/* <Panel eventKey="2" bsStyle="success">
                        <Panel.Heading>
                            <Panel.Title toggle>+</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <Row>
                                <Col xs={12} md={12} lg={12} className="DropdownButton">
                                    <DropdownButton title={this.state.dropdownTitle} bsSize="large" bsStyle="success" >
                                        <MenuItem eventKey="1">Evento Facebook #1</MenuItem>
                                        <MenuItem eventKey="2">Evento Facebook #2</MenuItem>
                                        <MenuItem eventKey="3">Evento Facebook #3</MenuItem>
                                    </DropdownButton>
                                </Col>
                            </Row>
                        </Panel.Body>
                    </Panel> */}
                </PanelGroup>
            </div>
        );
    }
}