import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import './MapListComponent.css'

export default class MapList extends Component {


    render() {
        return (
            <div className="ListDiv">
                <ListGroup >
                    <ListGroupItem header="Heading 1" >Some body text</ListGroupItem>
                    <ListGroupItem header="Heading 1" >Some body text</ListGroupItem>
                    <ListGroupItem header="Heading 1" >Some body text</ListGroupItem>
                    <ListGroupItem header="Heading 1" >Some body text</ListGroupItem>
                    <ListGroupItem header="Heading 1" >Some body text</ListGroupItem>
                    <ListGroupItem header="Heading 1" >Some body text</ListGroupItem>
                    <ListGroupItem header="Heading 1" >Some body text</ListGroupItem>
                    <ListGroupItem header="Heading 1" >Some body text</ListGroupItem>
                    <ListGroupItem header="Heading 1" >Some body text</ListGroupItem>
                    <ListGroupItem header="Heading 1" >Some body text</ListGroupItem>
                    <ListGroupItem header="Heading 1" >Some body text</ListGroupItem>
                    <ListGroupItem header="Heading 1" >Some body text</ListGroupItem>
                    <ListGroupItem header="Heading 3" bsStyle="danger">
                        Danger styling
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}
