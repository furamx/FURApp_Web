import React, { Component } from 'react';
import L from 'leaflet';
import Draw from 'leaflet-draw'
import './MapComponent.css'
// import ReactDOM from 'react-dom';

export default class MyMap extends Component {

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
            edit: {
                featureGroup: drawnItems
            }
        });
        map.addControl(drawControl);

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
            <div id="map" className="Map"></div>
        );
    }
}