import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class MyModal extends Component {
    constructor(props) {
        super(props);

        // this.handleShow = this.handleShow.bind(this);
        // this.handleHide = this.handleHide.bind(this);

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);

        this.state = { show: this.props.show };
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleHide() {
        this.setState({ show: false });
    }

    render() {
        return (
            <div className="static-modal">
                <Modal keyboard={true} animation={true} show={this.state.show} onHide={this.handleHide}>
                    <Modal.Header closeButton={true}>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.message}</Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.handleHide}>{this.props.button} </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}