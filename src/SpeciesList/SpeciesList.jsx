import React, { Component } from 'react';
import { Table, PageHeader, ListGroup, ListGroupItem, Carousel } from 'react-bootstrap';
import firebase from './../firebase.js';

export default class SpeciesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            species: []
        };
        this.createUITable = this.createUITable.bind(this);
    }

    componentWillMount() {
        const specieRef = firebase.database().ref("species").orderByKey();
        specieRef.once("value").then(
            (snapshot) => {
                snapshot.forEach(
                    (childSnapshot) => {
                        let specie = { specie: childSnapshot.val(), id: childSnapshot.key };
                        this.setState({ species: [specie].concat(this.state.species) });
                    }
                );
            });

        // specieRef.on('value', (snapshot) => {
        //     // let specie = { specie: snapshot.val(), id: snapshot.key };
        //     // this.setState({ species: [specie].concat(this.state.species) });
        // });

        // specieRef.on("value", (snapshot) => {
        //         snapshot.forEach(
        //             (childSnapshot) => {
        //                 let specie = { specie: childSnapshot.val(), id: childSnapshot.key };
        //                 this.setState({ species: [specie].concat(this.state.species) });
        //         });
        // });

    }
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <PageHeader>Especies Registradas <small>Árboles</small></PageHeader>
                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre Científico</th>
                            <th>Nombre Común</th>
                            <th>Imágenes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.species.length > 0 ? this.createUITable() : null}
                    </tbody>
                </Table>
            </div>
        );
    }
    /* Creates the table that shows registered species*/
    createUITable() {
        let uiItems = [];

        for (let i = 0; i < this.state.species.length; i++) {
            uiItems.push(
                <tr key={this.state.species[i].id}>
                    <td>{i + 1}</td>
                    <td>{this.state.species[i].specie.scientificName}</td>
                    <td>
                        <ListGroup>
                            {
                                this.state.species[i].specie.commonNames.map((listValue) => {
                                    return <ListGroupItem key={listValue}>{listValue}</ListGroupItem>
                                })
                            }
                        </ListGroup>
                    </td>
                    <td>
                        <Carousel
                            slide={false}
                        >
                            <Carousel.Item>
                                <img width={250} height={500} alt="250x500" src={this.state.species[i].specie.speciePhotos.treePhoto} />
                                <Carousel.Caption>
                                    <h3>Árbol completo</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={250} height={500} alt="250x500"src={this.state.species[i].specie.speciePhotos.treeFlowerPhoto} />
                                <Carousel.Caption>
                                    <h3>Flor</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={250} height={500} alt="250x500" src={this.state.species[i].specie.speciePhotos.treeFruitPhoto} />
                                <Carousel.Caption>
                                    <h3>Semilla o fruto</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={250} height={500} alt="250x500" src={this.state.species[i].specie.speciePhotos.treeLeafPhoto} />
                                <Carousel.Caption>
                                    <h3>Hoja</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={250} height={500} alt="250x500" src={this.state.species[i].specie.speciePhotos.treeRootPhoto} />
                                <Carousel.Caption>
                                    <h3>Raíz</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={250} height={500} alt="250x500" src={this.state.species[i].specie.speciePhotos.treeTrunkPhoto} />
                                <Carousel.Caption>
                                    <h3>Tronco</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </td>
                </tr>

            );
        }
        return uiItems || null;
    }

}

