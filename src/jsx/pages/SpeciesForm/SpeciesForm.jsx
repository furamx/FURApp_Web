import React, { Component } from 'react';
import { Button, InputGroup, Image, FormControl, Modal, FormGroup, ControlLabel, Row, Col, Thumbnail, PageHeader, Panel, ProgressBar } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import './SpeciesForm.css';
import addIcon from './../../../Images/Icons/add_1x.png';
import removeIcon from './../../../Images/Icons/remove_1x.png'
import firebase from './../../../firebase.js';
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
      scientificName: '',
      treeURL: '',
      treeTrunkURL: '',
      treeLeafURL: '',
      treeFruitURL: '',
      treeFlowerURL: '',
      treeRootURL: '',
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
    this.resetForm = this.resetForm.bind(this);
  }

  resetForm() {
    this.setState({
      scientificName: '',
      treeURL: '',
      treeTrunkURL: '',
      treeLeafURL: '',
      treeFruitURL: '',
      treeFlowerURL: '',
      treeRootURL: '',
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
      showModal: false
    });


  }

  handleChange(i, event) {
    let value = this.state.value.slice();
    value[i] = event.target.value;
    this.setState({ value });
  }


  handleSubmit(event) {
    event.preventDefault();
    const specieRef = firebase.database().ref('species');
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

    var flag = true;
    if (this.state.scientificName === null ||
      this.state.scientificName === '' ||
      this.state.value.length <= 0 ||
      this.state.treeTrunkURL === null ||
      this.state.treeLeafURL === null ||
      this.state.treeFruitURL === null ||
      this.state.treeFlowerURL === null ||
      this.state.treeRootURL === null ||
      this.state.value[0] === null ||
      this.state.value[0] === '') {
      flag = false;
    }
    if (flag === false) {
      this.setState({ alertVisible: true });
    }
    else if (flag === true) {
      this.setState({ alertVisible: false, showModal: true });
      specieRef.push(specie);
      this.resetForm();
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
   
  }

  /* Renders UI */
  render() {
    return (
      <div >
        <form className="form" onSubmit={this.handleSubmit}>
          <Panel className="Panel">
            <FormGroup>
              <PageHeader>Registrar nueva especie <small>Árbol</small></PageHeader>
            </FormGroup>
            {this.createUI()}
            <FormGroup bsSize="large">
              <h4><ControlLabel className="ControlLabel"> Nombre científico</ControlLabel></h4>
              <br /><br />
              <FormControl type="text"
                value={this.state.scientificName}
                placeholder="nombre científico de la especie"
                onChange={event => this.setState({ scientificName: event.target.value })
              }
              />
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs={12} md={6} lg={4}>
                  <Thumbnail className="thumbnails">
                    <h3>Árbol completo</h3>
                    <div className="upload-dropzone">
                      <Dropzone
                        ref={(node) => { dropzoneRefTree = node; }}
                        onDrop={(e) => this.handleTreeUpload(e)}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <Image width={150} height={150} src={this.state.treeURL} rounded responsive thumbnail={!this.state.buttonOne} />
                      </Dropzone>
                    </div>
                    <p>Imágen del árbol completo</p>
                    <p>
                      {
                        this.state.buttonOne ?
                          <Button bsStyle={"success"} block type="button" onClick={() => { dropzoneRefTree.open() }}>
                            <Image src={addIcon} />
                          </Button> :
                          <Button bsStyle={"danger"} block type="button" onClick={() => { this.removeFile(this.state.treeURL, 1) }}>
                            <Image src={removeIcon} />
                          </Button>
                      }
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeProgress.progress}
                      hidden={this.state.treeProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeProgress.progress}%`} />
                  </Thumbnail>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Thumbnail className="thumbnails">
                    <h3>Tronco</h3>
                    <div className="upload-dropzone">
                      <Dropzone
                        ref={(node) => { dropzoneRefTrunk = node; }}
                        onDrop={(e) => this.handleTreeTrunkUpload(e)}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <Image width={150} height={150} src={this.state.treeTrunkURL} rounded responsive thumbnail={!this.state.buttonTwo} />
                      </Dropzone>
                    </div>
                    <p>Imágen del tronco del árbol</p>
                    <p>
                      {
                        this.state.buttonTwo ?
                          <Button bsStyle={"success"} block type="button" onClick={() => { dropzoneRefTrunk.open() }}>
                            <Image src={addIcon} />
                          </Button> :
                          <Button bsStyle={"danger"} block type="button" onClick={() => { this.removeFile(this.state.treeTrunkURL, 2) }}>
                            <Image src={removeIcon} />
                          </Button>
                      }
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeTrunkProgress.progress}
                      hidden={this.state.treeTrunkProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeTrunkProgress.progress}%`} />
                  </Thumbnail>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Thumbnail className="thumbnails">
                    <h3>Hoja</h3>
                    <div className="upload-dropzone">
                      <Dropzone
                        ref={(node) => { dropzoneRefLeaf = node; }}
                        onDrop={(e) => this.handleTreeLeafUpload(e)}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <Image width={150} height={150} src={this.state.treeLeafURL} rounded responsive thumbnail={!this.state.buttonThree} />
                      </Dropzone>
                    </div>
                    <p>Imágen de la hoja del árbol</p>
                    <p>
                      {
                        this.state.buttonThree ?
                          <Button bsStyle={"success"} block type="button" onClick={() => { dropzoneRefLeaf.open() }}>
                            <Image src={addIcon} />
                          </Button> :
                          <Button bsStyle={"danger"} block type="button" onClick={() => { this.removeFile(this.state.treeLeafURL, 3) }}>
                            <Image src={removeIcon} />
                          </Button>
                      }
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeLeafProgress.progress}
                      hidden={this.state.treeLeafProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeLeafProgress.progress}%`} />
                  </Thumbnail>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Thumbnail className="thumbnails">
                    <h3>Semilla / Fruto</h3>
                    <div className="upload-dropzone">
                      <Dropzone
                        ref={(node) => { dropzoneRefSeed = node; }}
                        onDrop={(e) => this.handleTreeFruitUpload(e)}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <Image width={150} height={150} src={this.state.treeFruitURL} rounded responsive thumbnail={!this.state.buttonFour} />
                      </Dropzone>
                    </div>
                    <p>Imágen de la semilla/fruto del árbol</p>
                    <p>
                      {
                        this.state.buttonFour ?
                          <Button bsStyle={"success"} block type="button" onClick={() => { dropzoneRefSeed.open() }}>
                            <Image src={addIcon} />
                          </Button> :
                          <Button bsStyle={"danger"} block type="button" onClick={() => { this.removeFile(this.state.treeFruitURL, 4) }}>
                            <Image src={removeIcon} />
                          </Button>
                      }
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeFruitProgress.progress}
                      hidden={this.state.treeFruitProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeFruitProgress.progress}%`} />
                  </Thumbnail>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Thumbnail className="thumbnails">
                    <h3>Flor</h3>
                    <div className="upload-dropzone">
                      <Dropzone
                        ref={(node) => { dropzoneRefFlower = node; }}
                        onDrop={(e) => this.handleTreeFlowerUpload(e)}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <Image width={150} height={150} src={this.state.treeFlowerURL} rounded responsive thumbnail={!this.state.buttonFive} />
                      </Dropzone>
                    </div>
                    <p>Imágen de la flor del árbol</p>
                    <p>
                      {
                        this.state.buttonFive ?
                          <Button bsStyle={"success"} block type="button" onClick={() => { dropzoneRefFlower.open() }}>
                            <Image src={addIcon} />
                          </Button> :
                          <Button bsStyle={"danger"} block type="button" onClick={() => { this.removeFile(this.state.treeFlowerURL, 5) }}>
                            <Image src={removeIcon} />
                          </Button>
                      }
                    </p>
                    <ProgressBar striped bsStyle="success"
                      now={this.state.treeFlowerProgress.progress}
                      hidden={this.state.treeFlowerProgress.hidden}
                      id='tree_progress'
                      label={`${this.state.treeFlowerProgress.progress}%`} />
                  </Thumbnail>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Thumbnail className="thumbnails">
                    <h3>Raíz</h3>
                    <div className="upload-dropzone">
                      <Dropzone
                        ref={(node) => { dropzoneRefRoot = node; }}
                        onDrop={(e) => this.handleTreeRootUpload(e)}
                        accept="image/jpeg, image/png"
                        multiple={false}>
                        <Image width={150} height={150} src={this.state.treeRootURL} rounded responsive thumbnail={!this.state.buttonSix} />
                      </Dropzone>
                    </div>
                    <p>Imágen de la raíz del árbol</p>
                    <p>
                      {
                        this.state.buttonSix ?
                          <Button bsStyle={"success"} block type="button" onClick={() => { dropzoneRefRoot.open() }}>
                            <Image src={addIcon} />
                          </Button> :
                          <Button bsStyle={"danger"} block type="button" onClick={() => { this.removeFile(this.state.treeRootURL, 6) }}>
                            <Image src={removeIcon} />
                          </Button>
                      }
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
                  <Modal keyboard={true} animation={true} show={this.state.showModal} onHide={() => { this.setState({ showModal: false }) }}>
                    <Modal.Header closeButton={true}>
                      <Modal.Title>Especie registrada</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Se registró la especie correctamente</Modal.Body>
                    <Modal.Footer>
                      <Button bsStyle="success" onClick={() => this.setState({ showModal: false })}>Cerrar</Button>
                    </Modal.Footer>
                  </Modal>
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
    } else if (rejectedFile.length >= 1) {
      alert("Invalid File");
      window.URL.revokeObjectURL(rejectedFile.preview);
    }
  }
  /*Uploads Image to Storage*/
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
          console.log("Error");
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
          console.log('Something went wrong');
          break;
      }
    }, (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    }, () => {
      // Handle successful uploads on complete
      var downloadURL = uploadTask.snapshot.downloadURL;
      switch (dropzoneIdentifier) {
        case 1:
          this.setState({ treeURL: downloadURL, buttonOne: false });
          break;
        case 2:
          this.setState({ treeTrunkURL: downloadURL, buttonTwo: false });
          break;
        case 3:
          this.setState({ treeLeafURL: downloadURL, buttonThree: false });
          break;
        case 4:
          this.setState({ treeFruitURL: downloadURL, buttonFour: false });
          break;
        case 5:
          this.setState({ treeFlowerURL: downloadURL, buttonFive: false });
          break;
        case 6:
          this.setState({ treeRootURL: downloadURL, buttonSix: false });
          break;
        default:
          console.log('error');
          break;
      }
    });
  }
  /*Removes Image/File from Firebase storage*/
  removeFile(fileURL, id) {
    if (fileURL !== null) {
      // var storageRef = firebase.storage().ref('Species/' + file.name);
      var httpsReference = firebase.storage().refFromURL(fileURL);
      httpsReference.delete().then(function (id) {
        // File deleted successfully
        // console.log("File Removed " + id);
      }).catch(function (error) {
        console.log(error)
      });
      switch (id) {
        case 1:
          this.setState(prevState => ({
            treeProgress: {
              ...prevState.treeProgress6,
              progress: 0,
              hidden: true,
              disabled: true
            }
          }));
          this.setState({
            buttonOne: true,
            treeURL: null
          });
          break;
        case 2:
          this.setState(prevState => ({
            treeTrunkProgress: {
              ...prevState.treeTrunkProgress,
              progress: 0,
              hidden: true,
              disabled: true
            }
          }));
          this.setState({
            buttonTwo: true,
            treeTrunkURL: null
          });
          break;
        case 3:
          this.setState(prevState => ({
            treeLeafProgress: {
              ...prevState.treeLeafProgress,
              progress: 0,
              hidden: true,
              disabled: true
            }
          }));
          this.setState({
            buttonThree: true,
            treeLeafURL: null
          });
          break;
        case 4:
          this.setState(prevState => ({
            treeFruitProgress: {
              ...prevState.treeFruitProgress,
              progress: 0,
              hidden: true,
              disabled: true
            }
          }));
          this.setState({
            buttonFour: true,
            treeFruitURL: null
          });
          break;
        case 5:
          this.setState(prevState => ({
            treeFlowerProgress: {
              ...prevState.treeFlowerProgress,
              progress: 0,
              hidden: true,
              disabled: true
            }
          }));
          this.setState({
            buttonFive: true,
            treeFlowerURL: null
          });
          break;
        case 6:
          this.setState(prevState => ({
            treeRootProgress: {
              ...prevState.treeRootProgress,
              progress: 0,
              hidden: true,
              disabled: true
            }
          }));
          this.setState({
            buttonSix: true,
            treeRootURL: null
          });
          break;
        default:
          break;
      }
    }
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

