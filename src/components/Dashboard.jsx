import React, { Component } from 'react';
import {render} from 'react-dom';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import FAQ from './FAQ/FAQ';
import Events from './Activities/Activities';
import Alerts from './Alerts/Alerts';
import Users from './Users/Users';

class App extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout() {
    var URL = window.location.href.split("/")
    var baseURL = URL[0] + "//" + URL[2]
    window.location.replace(baseURL + "/logout");
  }


  render() {
		const inputFieldStyle = {
			width: "100%"
		}
    const logoutStyle = {
      position: "fixed",
      right: "10px",
      top: "5px"
    };

    return (
      <div>
        <ButtonToolbar>
          <Button bsStyle="danger" style={logoutStyle} onClick={this.handleLogout} bsSize="small">Logout</Button>
        </ButtonToolbar>

				<Grid style={{"width": "65%"}}>
					<Row className="show-grid">
              <FAQ />
              <Events />
							<Alerts />
							<Users />
          </Row>
				</Grid>
      </div>
    );
  }
}

export default App;
