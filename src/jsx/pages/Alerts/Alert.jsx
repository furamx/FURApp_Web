import React, { Component } from 'react';
import {Alert} from 'react-bootstrap';

export default class AlertDismissable extends Component {
	render() {
			return (
				<Alert bsStyle={this.props.bsStyle}>
					<h4>{this.props.title}</h4>
					<p>
                        {this.props.message}
					</p>
				</Alert>
			);
	}
}

// export default class AlertDismissable extends React.Component {
// 	constructor(props) {
// 		super(props);

// 		this.handleAlertShow = this.handleAlertShow.bind(this);
// 		this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
//         this.changeVisibility = this.changeVisibility.bind(this);
// 		this.state = {
// 			alertVisible: false
// 		};
// 	}

// 	handleAlertDismiss() {
// 		this.setState({ alertVisible: false });
//     }
    
//     changeVisibility(){
//         this.setState({ alertVisible: false });
//         this.props.changeVisibility(this.state.alertVisible);
//     }

// 	handleAlertShow() {
// 		this.setState({ alertVisible: true });
// 	}

// 	render() {
// 		if (this.state.alertVisible) {
// 			return (
// 				<Alert bsStyle="danger" onDismiss={this.changeVisibility}>
// 					<h4>Oh snap! You got an error!</h4>
// 					<p>
// 						Change this and that and try again. Duis mollis, est non commodo
// 						luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
// 						Cras mattis consectetur purus sit amet fermentum.
// 					</p>
// 				</Alert>
// 			);
// 		}
// 	}
// }
