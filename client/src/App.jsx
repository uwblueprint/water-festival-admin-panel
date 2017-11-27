import React, { Component } from 'react';
import {render} from 'react-dom';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import FAQ from './FAQPage.jsx';
import Events from './EventsPage.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
		const inputFieldStyle = {
			width: "100%"
		}
    return (
      <div>
				<Grid style={{"width": "65%"}}>
					<Row className="show-grid">
              <FAQ />
              <Events />
          </Row>
				</Grid>
      </div>
    );
  }
}

//export default App;
render(<App />, document.getElementById('react-app'));
