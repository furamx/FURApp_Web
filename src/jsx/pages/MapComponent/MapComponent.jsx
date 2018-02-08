import React, { Component } from 'react';
import L from 'leaflet';
import Draw from 'leaflet-draw';
import './MapComponent.css'
import { Button, Row, Col, FormGroup, FormControl, Panel, PanelGroup, ControlLabel, Glyphicon, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import MapList from './../MapListComponent/MapListComponent';
import firebase from './../../../firebase.js';
import * as facebook from './../../../facebook.js';

var map, drawnItems, drawControl;
export default class MyMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            areaName: '',
            value: [],
            layers: [],
            count: 0
        }

        this.handleAreaSubmit = this.handleAreaSubmit.bind(this);
        this.createZone = this.createZone.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeClick = this.removeClick.bind(this);

        this.drawMap = this.drawMap.bind(this);
        this.removeAllLayers = this.removeAllLayers.bind(this);
        this.addControl = this.addControl.bind(this);
        this.removeControl = this.removeControl.bind(this);
        // this.getEvents = this.getEvents.bind(this);

        // this.loadArea = this.loadArea.bind(this);
        // this.saveArea = this.saveArea.bind(this);
    }

    // getEvents(){
    //     fb.getEvents();
    // }
    // loadArea(){
    // //http://leafletjs.com/examples/geojson/
    // }
    // saveArea(){

    // }

    /*Handles form submission*/
    handleAreaSubmit(e) {
        e.preventDefault();

        if (navigator.onLine) {



            // var area = {
            //     areaName: '',
            //     areaLocation: null,
            //     areaPerimiter: 'geoJSON',
            //     zones: []
            // }

            // var zones = [];
            // var zone = {
            //     zoneName: '',
            //     zonePerimiter: 'geoJSON',
            // }

            // area.Name = this.state.areaName;

            // alert(area.Name);

            // alert(this.state.layers.length);

            // console.log("DRAWN ITEMS");
            // drawnItems.eachLayer((layer) => {
            //     // console.log(layer.getCenter());
            //     console.log(layer);
            // });

            // alert(drawnItems.getLayers().length)
            var layers = drawnItems.getLayers();

            var area = {};
            area.name = this.state.areaName;
            area.location = layers[0].getCenter();
            area.perimeter = layers[0].toGeoJSON();
            area.zones = [];

            //console.log(area);


            console.log(layers.length);
            // for (let i = 1; i <= layers.lenth; i++) {
            //     console.log(layers[i]);
            // }
            // alert(layers.length);
            // console.log(layers[0].getCenter());


            // this.removeAllLayers();
        } else {
            alert('no connection');
        }
    }

    /* */
    handleChange(i, event) {
        let value = this.state.value.slice();
        value[i] = event.target.value;
        this.setState({ value });
    }

    /* */
    removeClick(i) {
        let value = this.state.value.slice();
        value.splice(i, 1);
        this.setState({
            count: this.state.count - 1,
            value
        })
    }
    /* */
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

    /* Draws map*/
    drawMap() {
        map = L.map('map').setView([21.1523342, -101.7135019], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoidG9tZXBwIiwiYSI6ImNqZDF4cGxjdzJ1ajkyeHFzajIyeHU0OXAifQ.qGMa34lGx-azkIqe_mtSfw',
            zoomControl: false
        }).addTo(map);

        drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        drawControl = new L.Control.Draw({
            draw: true,
            position: 'topleft',
            edit: {
                featureGroup: drawnItems,
                edit: true,
                remove: true
            }
        });

        map.on(L.Draw.Event.CREATED, (e) => {
            var layer = e.layer;
            // layer.bindPopup('Hello');
            drawnItems.addLayer(layer);
            // alert(layer.getCenter());
            var nLayer = this.state.layers.slice();
            nLayer.push(layer);
            this.setState({ count: this.state.count + 1, layers: nLayer });
        });

        map.on(L.Draw.Event.EDITED, (e) => {
            alert('Layer edited');
        });

        map.on(L.Draw.Event.DELETED, (e) => {
            this.setState({ count: this.state.count - 1 });
            alert('Layer deleted');
        });

        map.addControl(drawControl);
    }

    /* */
    componentDidMount() {
        this.drawMap();
        this.removeControl();
        // alert(fb.getEvents());
        // facebook.getFacebookEvents();
    }

    /* Clears all layers from map, resets count*/
    removeAllLayers() {
        drawnItems.eachLayer((layer) => { drawnItems.removeLayer(layer); });
        this.removeControl();
        this.setState({ count: 0, });
        if (this.props.open) this.addControl();
    }

    /* Adds draw control to map*/
    addControl() {
        map.addControl(drawControl);
    }

    /* Removes draw control from map*/
    removeControl() {
        map.removeControl(drawControl);
    }

    /* Renders UI*/
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
                                    <Panel.Title>Nueva área y zonas</Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse onEnter={() => { this.addControl(); }} onExiting={() => { this.removeAllLayers(); }}>
                                    <Panel.Body >
                                        <form onSubmit={this.handleAreaSubmit}>
                                            <Row className="ControlLabel">
                                                <Col xs={12} md={12} lg={12} >
                                                    <ControlLabel >Ingrese el nombre del área:</ControlLabel>
                                                </Col>
                                            </Row>
                                            <Row className="ControlLabel">
                                                <Col xs={12} md={12} lg={12} >
                                                    {this.state.count > 0 ?
                                                        <FormGroup>
                                                            <FormControl type="text"
                                                                value={this.state.areaName}
                                                                onChange={(e) => this.setState({ areaName: e.target.value })}
                                                                placeholder="Nombre del área">
                                                            </FormControl>
                                                        </FormGroup> : "*No se ha delimitado un área"
                                                    }
                                                </Col>
                                                {/* <Col xs={12} md={12} lg={1} >
                                                <FormGroup>
                                                    <Button bsStyle="success" block type="submit">
                                                        <Glyphicon glyph="glyphicon glyphicon-floppy-disk" />
                                                    </Button>
                                                </FormGroup>
                                            </Col> */}
                                            </Row>
                                            <Row className="ControlLabel">
                                                <Col xs={12} md={12} lg={12} >
                                                    <ControlLabel className="ControlLabel">Ingrese el nombre de las zonas:</ControlLabel>
                                                </Col>
                                            </Row>
                                            <Row className="ControlLabel">
                                                <Col xs={12} md={12} lg={12} >
                                                    {this.state.count > 1 ? this.createZone() : "*No se han delimitado zonas"}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12} md={12} lg={12} className={"SaveButton"}>
                                                    <Button bsStyle="success" block type="submit" disabled={this.state.count <= 0 ? true : false}>
                                                        Guardar
                                                </Button>
                                             <Button onClick={facebook.getFacebookEvents()}>facebook</Button>
                                                </Col>
                                            </Row>
                                        </form>
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>
                        </PanelGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}
