import React, { Component } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Thumbnail } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
// import * as firebase from 'firebase';


class SpeciesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      count: 0,
      accepted: [],
      rejected: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(i, event) {
    let value = this.state.value.slice();
    value[i] = event.target.value;
    this.setState({ value });
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  addClick() {
    this.setState({ count: this.state.count + 1 })
  }
  removeClick(i) {
    let value = this.state.value.slice();
    value.splice(i, 1);
    this.setState({
      count: this.state.count - 1,
      value
    })
  }
  createUI() {
    let uiItems = [];
    for (let i = 0; i < this.state.count; i++) {
      uiItems.push(
        <div key={i}>
          <FormGroup bsSize="large">
            <InputGroup>
              <FormControl
                type="text"
                placeholder="nombre común de la especie"
                value={this.state.value[i] || ''}
                onChange={this.handleChange.bind(this, i)}
              />
              <InputGroup.Button>
                <Button bsSize="large"
                  onClick={this.removeClick.bind(this, i)} bsStyle='danger'>-</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </div>
      )
    }
    return uiItems || null;
  }
  render() {
    return (
      <div >
        <form className="form">
          <Panel>
            <FormGroup>
              <PageHeader>Registrar nueva especie <small>Árbol</small></PageHeader>
            </FormGroup>
            <FormGroup bsSize="large">
              <h4><ControlLabel > Nombre científico</ControlLabel></h4>
              <FormControl type="text"
                placeholder="nombre científico de la especie"
              />
            </FormGroup>

            <FormGroup bsSize="large">
              <h4><ControlLabel> Nombre común</ControlLabel></h4>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="nombre común de la especie"
                />
                <InputGroup.Button>
                  <Button bsSize="large"
                    onClick={this.addClick.bind(this)}
                    bsStyle='success'>+</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
            {this.createUI()}

            <FormGroup>
              <Row>
                <Col xs={6} md={4}>
                  <Thumbnail src="./logo.svg" alt="242x200">
                    <h3>Árbol completo</h3>

                    <Dropzone
                      accept="image/jpeg, image/png"
                      multiple={false}
                      onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
                    >
                      <p>Agregar Imagen</p>
                    </Dropzone>
                    <p>Imágen del árbol entero</p>
                    <p>
                      <Button bsStyle="success" type="file" block>+</Button>&nbsp;
                    </p>
                  </Thumbnail>
                </Col>

                <Col xs={6} md={4}>
                  <Thumbnail src="./logo.svg" alt="242x200">
                    <h3>Tronco</h3>
                    <Dropzone
                      accept="image/jpeg, image/png"
                      multiple={false}
                      onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
                    >
                      <p>Agregar Imagen</p>
                    </Dropzone>
                    <p>Imágen del tronco del árbol</p>
                    <p>
                      <Button bsStyle="success" block>+</Button>&nbsp;

                  </p>
                  </Thumbnail>
                </Col>

                <Col xs={6} md={4}>
                  <Thumbnail src="./logo.svg" alt="242x200">
                    <h3>Hoja</h3>
                    <Dropzone
                      accept="image/jpeg, image/png"
                      multiple={false}
                      onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
                    >
                      <p>Agregar Imagen</p>
                    </Dropzone>
                    <p>Imágen de la flor del árbol</p>
                    <p>
                      <Button bsStyle="success" block>+</Button>&nbsp;
                  </p>
                  </Thumbnail>
                </Col>
              </Row>

              <Row>
                <Col xs={6} md={4}>
                  <Thumbnail src="./logo.svg" alt="242x200">
                    <h3>Semilla / Fruto</h3>
                    <Dropzone
                      accept="image/jpeg, image/png"
                      multiple={false}
                      onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
                    >
                      <p>Agregar Imagen</p>
                    </Dropzone>
                    <p>Imágen de la semilla o fruto del árbol</p>
                    <p>
                      <Button bsStyle="success" block>+</Button>&nbsp;
                  </p>
                  </Thumbnail>
                </Col>

                <Col xs={6} md={4}>
                  <Thumbnail src="./logo.svg" alt="242x200">
                    <h3>Flor</h3>
                    <Dropzone
                      accept="image/jpeg, image/png"
                      multiple={false}
                      onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
                    >
                      <p>Agregar Imagen</p>
                    </Dropzone>
                    <p>Imágen de la flor del árbol</p>
                    <p>
                      <Button bsStyle="success" block>+</Button>&nbsp;
                  </p>
                  </Thumbnail>
                </Col>

                <Col xs={6} md={4}>
                  <Thumbnail src="./logo.svg" alt="242x200">
                    <h3>Raíz</h3>
                    <Dropzone
                      accept="image/jpeg, image/png"
                      multiple={false}
                      onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
                    >
                      <p>Agregar Imagen</p>
                    </Dropzone>
                    <p>Imágen de la raíz del árbol</p>
                    <p>
                      <Button bsStyle="success" block>+</Button>&nbsp;
                  </p>
                  </Thumbnail>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Button bsStyle="success" bsSize="large" block >Guardar</Button>&nbsp;
          </FormGroup>
          </Panel>
        </form>
      </div >
    );
  }
  uploadFile() {

  }
}

export default SpeciesForm;