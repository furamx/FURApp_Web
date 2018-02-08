import React, { Component } from 'react';
// import { Panel, PageHeader, PanelGroup, Button, Image, DropdownButton, MenuItem, Row, Col } from 'react-bootstrap';
import { Panel, PageHeader, PanelGroup, Button, Image, Row, Col } from 'react-bootstrap';

import './MapForm.css';
// import addIcon from './../../../Images/Icons/add_1x.png';
import MyMap from './../MapComponent/MapComponent';
import addIcon from './../../../Images/Icons/add_1x.png';
import removeIcon from './../../../Images/Icons/remove_1x.png'


export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelTitle: "Mapa",
            open: false
        }
    }
    render() {
        return (
            <div>
                <PageHeader className="PageHeader">Áreas<small> zonas</small></PageHeader>
                <PanelGroup accordion id="accordion-example" className="Panel">
                    <Panel eventKey="1" bsStyle="success">
                        <Panel.Heading className="PanelHeader">
                            <Panel.Title>

                                <Row>
                                    <Col xs={8} md={10} lg={11}>
                                        {this.state.panelTitle}
                                    </Col>
                                    <Col xs={4} md={2} lg={1} className="AddButton">
                                        <Button block bsStyle={this.state.open ? "danger" : "success"} onClick={(e) => this.setState({ open: !this.state.open })}>
                                            <Image src={this.state.open ? removeIcon : addIcon} />
                                        </Button>
                                    </Col>
                                </Row>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <MyMap open={this.state.open} />
                        </Panel.Body>
                    </Panel>
                </PanelGroup>
            </div>
        );
    }
}