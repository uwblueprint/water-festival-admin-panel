import React, { Component } from 'react';
import {render} from 'react-dom';
import { Button, ButtonToolbar, Col, Image, Grid, Row, Form, FormControl, FormGroup } from 'react-bootstrap'
import '../styles/styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />

				<Grid bsClass="container" style={{"width": "65%"}}>
					<Row>
            <Col xs={1} md={4}></Col>
            <Col xs={4} md={4}>
							<h1 className="text-center login-title" style={{"margin-top": "25px"}}>Sign in to continue to the Dashboard</h1>
							<div className="account-wall">
                <Image className="profile-img" src="https://i.imgur.com/jLrP7d1.png" />
									<form className="form-signin" action="/login" method="post">
										<FormGroup controlId="formLogin">
											<FormControl
												type="text"
												name="username"
                        className="form-control"
												placeholder="Username"
												autoFocus
											/>
											<FormControl
												type="password"
												name="password"
                        className="form-control"
												placeholder="Password"
											/>
											<ButtonToolbar>
												<Button type="submit" bsStyle="primary" bsSize="lg" block>Sign in</Button>
											</ButtonToolbar>
										</FormGroup>
									</form>
							</div>
            </Col>
            <Col xs={1} md={4}></Col>
					</Row>
				</Grid>
      </div>
    );
  }
}

export default Login;
