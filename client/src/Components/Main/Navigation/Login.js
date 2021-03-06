import React, { Component } from 'react';
import axios from 'axios';
import '../../../Styles/App.css';
import {RaisedButton, FlatButton, TextField, Dialog } from 'material-ui';
import { Row } from 'react-flexbox-grid';
import Flash from '../../Other/Flash';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      open: false,
      loading: false,
      alert: {type: '', msg: ''},
      showAlert: false
    }
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  handlePasswordChange= (e) => {
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then((result) => {
      localStorage.setItem('mernToken', result.data.token);
      this.props.lift(result.data);
      console.log("step before handleRedirect")
      this.props.handleRedirect();
      this.handleClose();
    }).catch((error) => {
      this.setState({alert: {type: 'error', msg: error.response.data.message}, showAlert: true});
    });
  }

  clearAlert = () => {
    this.setState({showAlert: false,});
  }

  handleClose = () => {
    this.setState({
      open: false,
      email: '',
      password: ''
    });
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        style={{margin: '.25em'}}
        onClick={this.handleClose}
      />,
      <RaisedButton
        label="Login"
        primary={true}
        style={{margin: '.25em'}}
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Login" onClick={this.handleOpen} />
        <Dialog
          title="Login"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div className='modal-content' >
            <Row>
              <TextField
                   hintText="Email"
                   floatingLabelText="Enter your email"
                   value={this.state.email}
                   onChange={this.handleEmailChange}
              />
            </Row>
            <Row>
              <TextField
                   hintText="Password"
                   floatingLabelText="Enter your password"
                   type="password"
                   value={this.state.password}
                   onChange={this.handlePasswordChange}
              />
            </Row>
            <Row>
              <Flash alert={this.state.alert} show={this.state.showAlert} clearAlert={this.clearAlert}/>
            </Row>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Login;



// Email: <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
//Password: <input type='password' value={this.state.password} onChange={this.handlePasswordChange} /><br />
