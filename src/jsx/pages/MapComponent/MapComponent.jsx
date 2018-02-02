import React, { Component } from 'react';
import L from 'leaflet';
import Draw from 'leaflet-draw';
import './MapComponent.css'
import { Button, Row, Col, FormGroup, FormControl, Panel, PanelGroup } from 'react-bootstrap';
import MapList from './../MapListComponent/MapListComponent';


export default class MyMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drawable: true,
            dropdownTitle: 'Eventos',
            mapName: '',
            hidden: true
        }
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
                        <PanelGroup>
                            <Panel id="collapsible-panel-1" expanded={this.props.open}>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        {/* Anim pariatur cliche reprehenderit, enim eiusmod high life
                                        accusamus terry richardson ad squid. Nihil anim keffiyeh
                                        helvetica, craft beer labore wes anderson cred nesciunt sapiente
                                        ea proident. */}
                                        <Zones/>
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>
                            <Panel id="collapsible-panel-2" expanded={this.props.open}>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        {/* Anim pariatur cliche reprehenderit, enim eiusmod high life
                                        accusamus terry richardson ad squid. Nihil anim keffiyeh
                                        helvetica, craft beer labore wes anderson cred nesciunt sapiente
                                        ea proident. */}
                                        <Zones/>
                                    </Panel.Body>
                                </Panel.Collapse>
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

const Zones = () => {
    return (
        <div>Hello there</div>
    );
}