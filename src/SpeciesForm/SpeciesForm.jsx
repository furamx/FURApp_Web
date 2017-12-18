import React, { Component } from 'react';
import { Button, InputGroup, Image, FormControl, FormGroup, ControlLabel, Row, Col, Thumbnail, PageHeader, Panel, ProgressBar } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import './SpeciesForm.css';
import addIcon from './../Images/Icons/add_1x.png'
import removeIcon from './../Images/Icons/remove_1x.png'
import firebase from './../firebase.js';

let dropzoneRefTree;
let dropzoneRefLeaf;
let dropzoneRefTrunk;
let dropzoneRefSeed;
let dropzoneRefFlower;
let dropzoneRefRoot;

export default class SpeciesForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scientificName: null,
      value: [],
      count: 1,
      accepted: [],
      rejected: [],
      files: [],
      treeFlowerProgress: 0,
      treeFruitProgress: 0,
      treeLeafProgress: 0,
      treeProgress: {
        progress: 0,
        hidden: true,
        disabled: true
      },
      treeRootProgress: 0,
      treeTrunkProgress: 0,
      testSatate: {
        progress: 0,
        hidden: true,
        disabled: true
      },
      buttonOne: true,
      buttonTwo: true,
      buttonThree: true,
      buttonFour: true,
      buttonFive: true,
      buttonSix: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.removeFile = this.removeFile.bind(this);

  }

  handleChange(i, event) {
    let value = this.state.value.slice();
    value[i] = event.target.value;
    this.setState({ value });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.scientificName);
    console.log("Scientifi name: " + this.state.scientificName);
    console.log(this.state.value);
    console.log(this.state.accepted);
    event.preventDefault();

    // var storageRef = firebase.storage().ref('Species');


    const specieRef = firebase.database().ref('species');
    const specie = {
      scientificName: this.state.scientificName,
      commonNames: this.state.value,
      speciePhotos: {
        treeFlowerPhoto: "photo_url",
        treeFruitPhoto: "photo_url",
        treeLeafPhoto: "photo_url",
        treePhoto: "photo_url",
        treeRootPhoto: "photo_url",
        treeTrunkPhoto: "photo_url"
      }
    }

    specieRef.push(specie);
  }
  /* Adds dynamic Input */
  addClick() {
    this.setState({ count: this.state.count + 1 })
  }

  /* Removes dynamic Input */
  removeClick(i) {
    let value = this.state.value.slice();
    value.splice(i, 1);
    this.setState({
      count: this.state.count - 1,
      value
    })
  }

  /*Creates dynamic fields */
  createUI() {
    let uiItems = [];
    uiItems.push(
      <div key={0}>
        <FormGroup bsSize="large">
          <h4><ControlLabel className="ControlLabel"> Nombre común</ControlLabel></h4>
          <br /><br />
          <InputGroup>
            <FormControl
              type="text"
              placeholder="nombre común de la especie"
              value={this.state.value[0] || ''}
              onChange={this.handleChange.bind(this, 0)}
            />
            <InputGroup.Button>
              <Button bsSize="large"
                className="dynamic-button"
                onClick={this.addClick.bind(this)}
                bsStyle='success'><Image src={addIcon} /></Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </div>
    );

    for (let i = 1; i < this.state.count; i++) {
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
                  className="dynamic-button"
                  onClick={this.removeClick.bind(this, i)}
                  bsStyle='danger'><Image src={removeIcon} /></Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </div>
      )
    }
    return uiItems || null;
  }

  componentDidMount() {
    //console.log('component did mount');
  }

  /* Renders UI */
  render() {
    return (
      <div >
        <form className="form" onSubmit={this.handleSubmit}>
          <Panel>
            <FormGroup>
              <PageHeader>Registrar nueva especie <small>Árbol</small></PageHeader>
            </FormGroup>
            <FormGroup bsSize="large">
              <h4><ControlLabel className="ControlLabel"> Nombre científico</ControlLabel></h4>
              <br /><br />
              <FormControl type="text"
                placeholder="nombre científico de la especie"
                onChange={event => this.setState({ scientificName: event.target.value })}
              />
            </FormGroup>
            {this.createUI()}
            <FormGroup>
              <Row>
                <Col xs={12} md={4} lg={2}>
                  <Thumbnail className="thumbnails">
                    <h3>Árbol completo</h3>
                    <div className="upload-dropzone">
                      <Dropzone
                        ref={(node) => { dropzoneRefTree = node; }}
                        onDrop={(accepted, rejected) => this.onDrop(accepted)}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <p>Drop files here.</p>
                      </Dropzone>
                    </div>
                    <p>Imágen del árbol entero</p>
                    <p>
                      <Button bsStyle={this.state.buttonThree ? "success" : "danger"} block type="button" onClick={() => { dropzoneRefTree.open() }}>
                        <Image src={this.state.buttonThree ? addIcon : removeIcon} />
                      </Button>&nbsp;
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeProgress.progress}
                      hidden={this.state.treeProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeProgress.progress}%`} />
                  </Thumbnail>
                </Col>
                <Col xs={12} md={4} lg={2}>
                  <Thumbnail className="thumbnails">
                    <h3>Tronco</h3>
                    <div className="upload-dropzone">
                      <Dropzone
                        ref={(node) => { dropzoneRefTrunk = node; }}
                        onDrop={(accepted, rejected) => { alert('trunk') }}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <p>Drop files here.</p>
                      </Dropzone>
                    </div>
                    <p>Imágen del árbol entero</p>
                    <p>
                      <Button bsStyle={this.state.buttonThree ? "success" : "danger"} block type="button" onClick={() => { dropzoneRefTrunk.open() }}>
                        <Image src={this.state.buttonThree ? addIcon : removeIcon} />
                      </Button>&nbsp;
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeProgress.progress}
                      hidden={this.state.treeProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeProgress.progress}%`} />
                  </Thumbnail>
                </Col>
                <Col xs={12} md={4} lg={2}>
                  <Thumbnail className="thumbnails">
                    <h3>Hoja</h3>
                    <div className="upload-dropzone">
                      {/* <Dropzone
                        accept="image/jpeg, image/png"
                        multiple={false}
                        onDrop={this.onDrop.bind(this)}
                      // disabled={this.state.buttonThree}
                      >
                        <p>Agregar Imagen</p>
                      </Dropzone> */}
                      <Dropzone
                        ref={(node) => { dropzoneRefLeaf = node; }}
                        onDrop={(accepted, rejected) => { alert('leaf') }}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <p>Drop files here.</p>
                      </Dropzone>
                    </div>
                    <p>Imágen del árbol entero</p>
                    <p>
                      <Button bsStyle={this.state.buttonThree ? "success" : "danger"} block type="button" onClick={() => { dropzoneRefLeaf.open() }}>
                        <Image src={this.state.buttonThree ? addIcon : removeIcon} />
                      </Button>&nbsp;
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeProgress.progress}
                      hidden={this.state.treeProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeProgress.progress}%`} />
                  </Thumbnail>
                </Col>
                <Col xs={12} md={4} lg={2}>
                  <Thumbnail className="thumbnails">
                    <h3>Semilla / Fruto</h3>
                    <div className="upload-dropzone">
                      <Dropzone
                        ref={(node) => { dropzoneRefSeed = node; }}
                        onDrop={(accepted, rejected) => { alert('seed') }}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <p>Drop files here.</p>
                      </Dropzone>
                    </div>
                    <p>Imágen del árbol entero</p>
                    <p>
                      <Button bsStyle={this.state.buttonThree ? "success" : "danger"} block type="button" onClick={() => { dropzoneRefSeed.open() }}>
                        <Image src={this.state.buttonThree ? addIcon : removeIcon} />
                      </Button>&nbsp;
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeProgress.progress}
                      hidden={this.state.treeProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeProgress.progress}%`} />
                  </Thumbnail>
                </Col>
                <Col xs={12} md={4} lg={2}>
                  <Thumbnail className="thumbnails">
                    <h3>Flor</h3>
                    <div className="upload-dropzone">
                      <Dropzone
                        ref={(node) => { dropzoneRefFlower = node; }}
                        onDrop={(accepted, rejected) => { alert('Flower') }}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <p>Drop files here.</p>
                      </Dropzone>
                    </div>
                    <p>Imágen del árbol entero</p>
                    <p>
                      <Button bsStyle={this.state.buttonThree ? "success" : "danger"} block type="button" onClick={() => { dropzoneRefFlower.open() }}>
                        <Image src={this.state.buttonThree ? addIcon : removeIcon} />
                      </Button>&nbsp;
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeProgress.progress}
                      hidden={this.state.treeProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeProgress.progress}%`} />
                  </Thumbnail>
                </Col>
                <Col xs={12} md={4} lg={2}>
                  <Thumbnail className="thumbnails">
                    <h3>Raíz</h3>
                    <div className="upload-dropzone">
                      <Dropzone
                        ref={(node) => { dropzoneRefRoot = node; }}
                        onDrop={(accepted, rejected) => { alert('Root') }}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <p>Drop files here.</p>
                      </Dropzone>
                    </div>
                    <p>Imágen del árbol entero</p>
                    <p>
                      <Button bsStyle={this.state.buttonThree ? "success" : "danger"} block type="button" onClick={() => { dropzoneRefRoot.open() }}>
                        <Image src={this.state.buttonThree ? addIcon : removeIcon} />
                      </Button>&nbsp;
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeProgress.progress}
                      hidden={this.state.treeProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeProgress.progress}%`} />
                  </Thumbnail>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Button bsStyle="success" bsSize="large" type="submit" onClick={this.registerSpecie} block >Guardar</Button>&nbsp;
            </FormGroup>
          </Panel>
        </form>
      </div >
    );
  }

  //Handle File selection
  onDrop(files, rejected) {
    console.log("entered on drop");
    this.setState({
      files
    });
    console.log(files);
    console.log(files[0].name);
    var storageRef = firebase.storage().ref('Species/' + files[0].name);
    var uploadTask = storageRef.put(files[0]);

    uploadTask.on('state_changed', (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      //this.setState({ treeProgress: Math.round(progress) });


      //console.log(this.state.testSatate);

      this.setState(prevState => ({
        treeProgress: {
          ...prevState.treeProgress,
          progress: Math.round(progress),
          hidden: false,
          disabled: true
        }
      }));

      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
        default:
          console.log('SHIT');
          break;
      }
    }, (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    }, () => {
      // Handle successful uploads on complete
      var downloadURL = uploadTask.snapshot.downloadURL;
      alert(downloadURL);
    }).bind(this);
  }

  removeFile() {

  }
}
