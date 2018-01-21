import React, { Component } from 'react';
import { Button, InputGroup, Image, FormControl, FormGroup, ControlLabel, Row, Col, Thumbnail, PageHeader, Panel, ProgressBar } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import './SpeciesForm.css';
import addIcon from './../Images/Icons/add_1x.png'
import removeIcon from './../Images/Icons/remove_1x.png'
import firebase from './../firebase.js';
import MyAlert from './../Alerts/Alert';
import SpeciesList from './../SpeciesList/SpeciesList';
// import CustomModal from './../Modals/Modals';


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
      alertVisible: false,
      scientificName: null,
      treeURL: null,
      treeTrunkURL: null,
      treeLeafURL: null,
      treeFruitURL: null,
      treeFlowerURL: null,
      treeRootURL: null,
      value: [],
      count: 1,
      accepted: [],
      rejected: [],
      files: [],
      treeFlowerProgress: {
        progress: 0,
        hidden: true,
        disabled: true
      },
      treeFruitProgress: {
        progress: 0,
        hidden: true,
        disabled: true
      },
      treeLeafProgress: {
        progress: 0,
        hidden: true,
        disabled: true
      },
      treeProgress: {
        progress: 0,
        hidden: true,
        disabled: true
      },
      treeRootProgress: {
        progress: 0,
        hidden: true,
        disabled: true
      },
      treeTrunkProgress: {
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
      showModal: false,
      modalTitle: null,
      modalBody: null,
      modalButton: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleTreeUpload = this.handleTreeUpload.bind(this);
    this.handleTreeTrunkUpload = this.handleTreeTrunkUpload.bind(this);
    this.handleTreeLeafUpload = this.handleTreeLeafUpload.bind(this);
    this.handleTreeFruitUpload = this.handleTreeFruitUpload.bind(this);
    this.handleTreeFlowerUpload = this.handleTreeFlowerUpload.bind(this);
    this.handleTreeRootUpload = this.handleTreeRootUpload.bind(this);
  }

  handleChange(i, event) {
    let value = this.state.value.slice();
    value[i] = event.target.value;
    this.setState({ value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // const specieRef = firebase.database().ref('species');
    const specie = {
      scientificName: this.state.scientificName,
      commonNames: this.state.value,
      speciePhotos: {
        treeFlowerPhoto: this.state.treeFlowerURL,
        treeFruitPhoto: this.state.treeFruitURL,
        treeLeafPhoto: this.state.treeLeafURL,
        treePhoto: this.state.treeURL,
        treeRootPhoto: this.state.treeRootURL,
        treeTrunkPhoto: this.state.treeTrunkURL
      }
    }

    console.log(specie);



    // this.setState({ alertVisible: !this.state.alertVisible });


    var flag = true;
    console.log(flag);
    // console.log(this.state.value);
    // if (this.state.scientificName === null ||
    //   this.state.scientificName === "" ||
    //   this.state.value.length <= 0 ||
    //   this.state.treeTrunkURL === null ||
    //   this.state.treeLeafURL === null ||
    //   this.state.treeFruitURL === null ||
    //   this.state.treeFlowerURL === null ||
    //   this.state.treeRootURL === null)
    //   flag = false;

    // if (this.state.scientificName === null ||
    //   this.state.scientificName === "" ||
    //   this.state.value.length <= 0)
    //   flag = false;
    // console.log('TypeOf:' + typeof (this.state.value));
    // if (typeof (this.state.value === 'undefined')) {
    //   flag = false;
    //   console.log('Undefined shit');
    // } else {
    //   for (var i = 0; i < this.state.value.length; i++) {
    //     console.log("Loop: " + this.state.value[i]);
    //     if (this.state.value[i] === "" || this.state.value[i] === null || typeof (this.state.value[i] === 'empty') || typeof (this.state.value[i] === 'undefined')) {
    //       flag = false;
    //     }
    //   }
    // }


    // console.log(this.state.value.length);


    console.log(flag);
    if (flag === false) {
      this.setState({ alertVisible: true });
    }
    else if (flag === true) {
      // console.log('Completed registration');
      this.setState({ alertVisible: false });
      // specieRef.push(specie);

      this.setState({
        showModal: true,
        modalTitle: "Registro existoso",
        modalBody: "Se registró la especie exitosamente",
        modalButton: "Cerrar"
      });
    }

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
                        onDrop={(e) => this.handleTreeUpload(e)}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <p>Arrastre la imágen aquí.</p>
                        <Image width={150} height={150} src={this.state.treeURL} rounded responsive thumbnail={true}/>
                      </Dropzone>
                    </div>
                    <p>Imágen del árbol completo</p>
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
                        // onDrop={(accepted, rejected) => { alert('trunk') }}
                        onDrop={(e) => this.handleTreeTrunkUpload(e)}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <p>Arrastre la imágen aquí.</p>
                      </Dropzone>
                    </div>
                    <p>Imágen del tronco del árbol</p>
                    <p>
                      <Button bsStyle={this.state.buttonThree ? "success" : "danger"} block type="button" onClick={() => { dropzoneRefTrunk.open() }}>
                        <Image src={this.state.buttonThree ? addIcon : removeIcon} />
                      </Button>&nbsp;
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeTrunkProgress.progress}
                      hidden={this.state.treeTrunkProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeTrunkProgress.progress}%`} />
                  </Thumbnail>
                </Col>
                <Col xs={12} md={4} lg={2}>
                  <Thumbnail className="thumbnails">
                    <h3>Hoja</h3>
                    <div className="upload-dropzone">
                      <Dropzone
                        ref={(node) => { dropzoneRefLeaf = node; }}
                        onDrop={(e) => this.handleTreeLeafUpload(e)}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <p>Arrastre la imágen aquí.</p>
                      </Dropzone>
                    </div>
                    <p>Imágen de la hoja del árbol</p>
                    <p>
                      <Button bsStyle={this.state.buttonThree ? "success" : "danger"} block type="button" onClick={() => { dropzoneRefLeaf.open() }}>
                        <Image src={this.state.buttonThree ? addIcon : removeIcon} />
                      </Button>&nbsp;
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeLeafProgress.progress}
                      hidden={this.state.treeLeafProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeLeafProgress.progress}%`} />
                  </Thumbnail>
                </Col>
                <Col xs={12} md={4} lg={2}>
                  <Thumbnail className="thumbnails">
                    <h3>Semilla / Fruto</h3>
                    <div className="upload-dropzone">
                      <Dropzone
                        ref={(node) => { dropzoneRefSeed = node; }}
                        onDrop={(e) => this.handleTreeFruitUpload(e)}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <p>Arrastre la imágen aquí.</p>
                      </Dropzone>
                    </div>
                    <p>Imágen de la semilla/fruto del árbol</p>
                    <p>
                      <Button bsStyle={this.state.buttonThree ? "success" : "danger"} block type="button" onClick={() => { dropzoneRefSeed.open() }}>
                        <Image src={this.state.buttonThree ? addIcon : removeIcon} />
                      </Button>&nbsp;
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeFruitProgress.progress}
                      hidden={this.state.treeFruitProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeFruitProgress.progress}%`} />
                  </Thumbnail>
                </Col>
                <Col xs={12} md={4} lg={2}>
                  <Thumbnail className="thumbnails">
                    <h3>Flor</h3>
                    <div className="upload-dropzone">
                      <Dropzone
                        ref={(node) => { dropzoneRefFlower = node; }}
                        onDrop={(e) => this.handleTreeFlowerUpload(e)}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <p>Arrastre la imágen aquí.</p>
                      </Dropzone>
                    </div>
                    <p>Imágen de la flor del árbol</p>
                    <p>
                      <Button bsStyle={this.state.buttonThree ? "success" : "danger"} block type="button" onClick={() => { dropzoneRefFlower.open() }}>
                        <Image src={this.state.buttonThree ? addIcon : removeIcon} />
                      </Button>&nbsp;
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeFlowerProgress.progress}
                      hidden={this.state.treeFlowerProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeFlowerProgress.progress}%`} />
                  </Thumbnail>
                </Col>
                <Col xs={12} md={4} lg={2}>
                  <Thumbnail className="thumbnails">
                    <h3>Raíz</h3>
                    <div className="upload-dropzone">
                      <Dropzone
                        ref={(node) => { dropzoneRefRoot = node; }}
                        onDrop={(e) => this.handleTreeRootUpload(e)}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <p>Arrastre la imágen aquí.</p>
                      </Dropzone>
                    </div>
                    <p>Imágen de la raíz del árbol</p>
                    <p>
                      <Button bsStyle={this.state.buttonThree ? "success" : "danger"} block type="button" onClick={() => { dropzoneRefRoot.open() }}>
                        <Image src={this.state.buttonThree ? addIcon : removeIcon} />
                      </Button>&nbsp;
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeRootProgress.progress}
                      hidden={this.state.treeRootProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeRootProgress.progress}%`} />
                  </Thumbnail>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Button bsStyle="success" bsSize="large" type="submit" onClick={this.registerSpecie} block >Guardar</Button>&nbsp;
              {this.state.alertVisible ? <MyAlert className='warningText'
                title="Elementos faltantes"
                message="Por favor asegurese que todos los campos estén completos y que todas las imágenes hayan sido agregadas antes de continuar."
                bsStyle="danger" /> : null}
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs={12} md={12} lg={12}>
                  <SpeciesList />
                  {/* <CustomModal show={true} title={"Hey"} message={"Especie registrada existosamente"}/> */}
                </Col>
              </Row>
            </FormGroup>
          </Panel>

        </form>
      </div >
    );
  }

  /*Handles File selection*/
  onDrop(acceptedFile, rejectedFile) {
    if (acceptedFile.length >= 1) {
      console.log(acceptedFile[0].name);
      alert('valid file');
      // var url = this.uploadImage(acceptedFile[0]);
      // console.log('yo' + url)
      // console.log(url);
      // window.URL.revokeObjectURL(acceptedFile.preview);
    } else if (rejectedFile.length >= 1) {
      alert("Invalid File");
      console.log(rejectedFile[0].name);
      window.URL.revokeObjectURL(rejectedFile.preview);
    }
  }
  uploadImage(file, dropzoneIdentifier) {
    var storageRef = firebase.storage().ref('Species/' + file.name);
    var uploadTask = storageRef.put(file);
    uploadTask.on('state_changed', (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      switch (dropzoneIdentifier) {
        case 1:
          this.setState(prevState => ({
            treeProgress: {
              ...prevState.treeProgress,
              progress: Math.round(progress),
              hidden: false,
              disabled: true
            }
          }));
          break;
        case 2:
          this.setState(prevState => ({
            treeTrunkProgress: {
              ...prevState.treeTrunkProgress,
              progress: Math.round(progress),
              hidden: false,
              disabled: true
            }
          }));
          break;
        case 3:
          this.setState(prevState => ({
            treeLeafProgress: {
              ...prevState.treeLeafProgress,
              progress: Math.round(progress),
              hidden: false,
              disabled: true
            }
          }));
          break;
        case 4:
          this.setState(prevState => ({
            treeFruitProgress: {
              ...prevState.treeFruitProgress,
              progress: Math.round(progress),
              hidden: false,
              disabled: true
            }
          }));
          break;
        case 5:
          this.setState(prevState => ({
            treeFlowerProgress: {
              ...prevState.treeFlowerProgress,
              progress: Math.round(progress),
              hidden: false,
              disabled: true
            }
          }));
          break;
        case 6:
          this.setState(prevState => ({
            treeRootProgress: {
              ...prevState.treeRootProgress,
              progress: Math.round(progress),
              hidden: false,
              disabled: true
            }
          }));
          break;
        default:
          console.log("meh");
          break;
      }
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
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
      console.log(uploadTask.snapshot);
      // alert(downloadURL);
      switch (dropzoneIdentifier) {
        case 1:
          this.setState({ treeURL: downloadURL });
          console.log(this.state.treeURL);
          break;
        case 2:
          this.setState({ treeTrunkURL: downloadURL });
          console.log(this.state.treeTrunkURL);
          break;
        case 3:
          this.setState({ treeLeafURL: downloadURL });
          console.log(this.state.treeLeafURL);
          break;
        case 4:
          this.setState({ treeFruitURL: downloadURL });
          console.log(this.state.treeFruitURL);
          break;
        case 5:
          this.setState({ treeFlowerURL: downloadURL });
          console.log(this.state.treeFlowerURL);
          break;
        case 6:
          this.setState({ treeRootURL: downloadURL });
          console.log(this.state.treeRootURL);
          break;
        default:
          console.log('error');
          break;
      }
    });
  }
  removeFile() {
  }
  //Image Upload Event Handlers
  handleTreeUpload(file) {
    if (file.length > 0) {
      this.uploadImage(file[0], 1);
    }

  }
  handleTreeTrunkUpload(file) {
    if (file.length > 0) {
      this.uploadImage(file[0], 2);
    }

  }
  handleTreeLeafUpload(file) {
    if (file.length > 0) {
      this.uploadImage(file[0], 3);
    }

  }
  handleTreeFruitUpload(file) {
    if (file.length > 0) {
      this.uploadImage(file[0], 4);
    }

  }
  handleTreeFlowerUpload(file) {
    if (file.length > 0) {
      this.uploadImage(file[0], 5);
    }

  }
  handleTreeRootUpload(file) {
    if (file.length > 0) {
      this.uploadImage(file[0], 6);
    }

  }
}

