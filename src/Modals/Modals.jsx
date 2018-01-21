import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class MyModal extends Component {
    constructor(...args) {
        super(...args);

        // this.handleShow = this.handleShow.bind(this);
        // this.handleHide = this.handleHide.bind(this);

        this.state = { show: false };
    }

    render() {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>{this.props.message}</Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => { this.setState({ show: false }) }}>{this.props.button}</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}