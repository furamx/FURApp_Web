import React, { Component } from 'react';
import L from 'leaflet';
import Draw from 'leaflet-draw';
import './MapComponent.css'
import { Button, Row, Col, FormGroup, FormControl, Panel, PanelGroup, ControlLabel, Glyphicon, InputGroup } from 'react-bootstrap';
import MapList from './../MapListComponent/MapListComponent';


export default class MyMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drawable: true,
            dropdownTitle: 'Eventos',
            mapName: '',
            hidden: true,
            areaName: '',
            panelOpen: false,
            value: [],
            count: 5
        }

        this.handleAreaSubmit = this.handleAreaSubmit.bind(this);
        this.handleZonesSubmit = this.handleZonesSubmit.bind(this);
        this.createZone = this.createZone.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeClick = this.removeClick.bind(this);
    }

    handleAreaSubmit(e) {
        e.preventDefault();
        alert('area submited');
        this.setState({ panelOpen: true });
    }

    handleZonesSubmit(e) {
        e.preventDefault();
        alert('zones submited');
    }

    handleChange(i, event) {
        let value = this.state.value.slice();
        value[i] = event.target.value;
        this.setState({ value });
    }

    removeClick(i) {
        let value = this.state.value.slice();
        value.splice(i, 1);
        this.setState({
            count: this.state.count - 1,
            value
        })
    }

    createZone() {
        let zones = [];
        for (let i = 1; i < this.state.count; i++) {
            zones.push(
                <div key={i}>
                    <FormGroup>
                        <InputGroup>
                            <FormControl
                                type="text"
                                value={this.state.value[i] || ''}
                                onChange={this.handleChange.bind(this, i)}
                                placeholder="Nombre de la zona" />
                            <InputGroup.Button>
                                <Button
                                    block
                                    className="dynamic-button"
                                    onClick={this.removeClick.bind(this, i)}
                                    bsStyle='danger'><Glyphicon glyph="glyphicon glyphicon-remove" />
                                </Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </div>
            );
        }
        return zones;
    }

    componentDidMount() {

        var map = L.map('map').setView([21.1523342, -101.7135019], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoidG9tZXBwIiwiYSI6ImNqZDF4cGxjdzJ1ajkyeHFzajIyeHU0OXAifQ.qGMa34lGx-azkIqe_mtSfw',
            zoomControl: false
        }).addTo(map);

        var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        var drawControl = new L.Control.Draw({
            draw: this.state.drawable,
            position: 'topright',
            edit: {
                featureGroup: drawnItems,
                edit: true,
                remove: false
            }
        });

        map.addControl(drawControl);

        map.on(L.Draw.Event.CREATED, (e) => {
            var type = e.layerType,
                layer = e.layer;
            console.log(layer);
            // Do whatever else you need to. (save to db; add to map etc)
            map.addLayer(layer);
        });

        // map.on(L.Draw.Event.EDITED, (e) => {
        //     var type = e.layerType,
        //         layer = e.layer;
        //     console.log(layer);
        //     // Do whatever else you need to. (save to db; add to map etc)
        //     map.addLayer(layer);
        // });

        // var map = L.map('map', {drawControl: true}).setView([51.505, -0.09], 13);
        // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(map);
        // FeatureGroup is to store editable layers
        // var drawnItems = new L.FeatureGroup();
        // map.addLayer(drawnItems);
        // var drawControl = new L.Control.Draw({
        //     edit: {
        //         featureGroup: drawnItems
        //     }
        // });
        // map.addControl(drawControl);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={12} md={12} lg={10}>
                        <div id="map" className="Map"></div>
                    </Col>
                    <Col xs={12} md={12} lg={2}>
                        <MapList />
                    </Col>
                </Row>
                <Row className='Row'>
                    <Col xs={12} md={12} lg={12}>
                        <PanelGroup id="panel-group-1" >
                            <Panel id="collapsible-panel-1" expanded={this.props.open} onToggle={this.props.open} eventKey="1" bsStyle="success">
                                <Panel.Heading className="PanelHeader" hidden={!this.props.open}>
                                    <Panel.Title>Área</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <form onSubmit={this.handleAreaSubmit}>
                                        <Row className="ControlLabel">
                                            <Col xs={12} md={12} lg={12} >
                                                <ControlLabel >Ingrese el nombre del área</ControlLabel>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12} lg={11} >
                                                <FormGroup>
                                                    <FormControl type="text"
                                                        value={this.state.areaName}
                                                        onChange={(e) => this.setState({ areaName: e.target.value })}
                                                        placeholder="Nombre del área">
                                                    </FormControl>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12} md={12} lg={1} >
                                                <FormGroup>
                                                    {/* {
                                                        this.state.panelOpen ?
                                                            <Button bsStyle="danger" block bsSize="large" type="button" onClick={() => {this.setState({ panelOpen: false })}}>
                                                                <Glyphicon glyph="glyphicon glyphicon-floppy-remove" />
                                                            </Button> :
                                                            <Button bsStyle="success" block bsSize="large" type="submit">
                                                                <Glyphicon glyph="glyphicon glyphicon-floppy-disk" />
                                                            </Button>
                                                    } */}
                                                    <Button bsStyle="success" block type="submit">
                                                        <Glyphicon glyph="glyphicon glyphicon-floppy-disk" />
                                                    </Button>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </form>
                                </Panel.Body>
                            </Panel>
                            <Panel id="collapsible-panel-2" expanded={this.state.panelOpen} onToggle={this.props.open} eventKey="2" bsStyle="success">
                                <Panel.Heading className="PanelHeader" hidden={!this.props.open}>
                                    <Panel.Title>Zonas</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <form onSubmit={this.handleZonesSubmit}>
                                        <Row className="ControlLabel">
                                            <Col xs={12} md={12} lg={12} >
                                                <ControlLabel className="ControlLabel">Ingrese el nombre de las zonas</ControlLabel>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12} lg={12} >
                                                {this.createZone()}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12} lg={12} >
                                                <Button bsStyle="success" block type="submit">
                                                    Guardar
                                                </Button>
                                            </Col>
                                        </Row>
                                    </form>
                                </Panel.Body>
                            </Panel>
                        </PanelGroup>
                    </Col>
                </Row>
                <Row className='Row' hidden={this.state.hidden}>
                    <Col xs={12} md={6} lg={10}>
                        <FormGroup>
                            <FormControl
                                type="text"
                                bsSize="large"
                                value={this.state.mapName}
                                onChange={(e) => this.setState({ mapName: e.target.value })}
                                placeholder='Nombre de la zona'
                            >
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6} lg={2}>
                        <FormGroup bsSize='large'>
                            <FormControl componentClass="select" placeholder='Eventos' >
                                <option value="Eventos">Eventos</option>
                                <option value="other">Evento Facebook #1</option>
                                <option value="other">Evento Facebook #2</option>
                                <option value="other">Evento Facebook #3</option>
                            </FormControl>
                        </FormGroup>
                    </Col>
                </Row>
                <Row hidden={this.state.hidden}>
                    <Col xs={12} md={12} lg={12}>
                        <Button className="Button" onClick={() => this.setState({ drawable: true })} bsStyle="success" bsSize="large" type="submit" block >Guardar</Button>&nbsp;
                    </Col>
                </Row>
            </div>
        );
    }
}
