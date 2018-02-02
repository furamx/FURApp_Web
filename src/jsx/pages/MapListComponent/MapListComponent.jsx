import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import './MapListComponent.css'

export default class MapList extends Component {


    render() {
        return (
            <div >
                <Panel bsStyle="success">
                    <Panel.Heading>
                        <Panel.Title >Mis áreas</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body className="ListPanel" >
                        <div className="ListDiv">
                            <ListGroup>
                                <div className="ListPanelItem"><ListGroupItem header="Área #1" >Descripción área #1</ListGroupItem></div>
                                <div className="ListPanelItem"><ListGroupItem header="Área #1" >Descripción área #2</ListGroupItem></div>
                                <div className="ListPanelItem"><ListGroupItem header="Área #1" >Descripción área #3</ListGroupItem></div>
                                <div className="ListPanelItem"><ListGroupItem header="Área #1" >Descripción área #4</ListGroupItem></div>
                                <div className="ListPanelItem"><ListGroupItem header="Área #1" >Descripción área #5</ListGroupItem></div>
                                <div className="ListPanelItem"><ListGroupItem header="Área #1" >Descripción área #6</ListGroupItem></div>
                                <div className="ListPanelItem"><ListGroupItem header="Área #1" >Descripción área #7</ListGroupItem></div>
                                <div className="ListPanelItem"><ListGroupItem header="Área #1" >Descripción área #8</ListGroupItem></div>
                                <div className="ListPanelItem"><ListGroupItem header="Área #1" >Descripción área #9</ListGroupItem></div>
                            </ListGroup>
                        </div>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}
