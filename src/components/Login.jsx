import React, { Component } from 'react';
import {render} from 'react-dom';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <form action="/login" method="post">
          <div>
            <label>Username:</label>
            <input type="text" name="username"/><br/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password"/>
          </div>
          <div>
            <input type="submit" value="Submit"/>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
