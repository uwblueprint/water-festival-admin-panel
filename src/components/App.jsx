import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'

ReactDOM.render((
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/dashboard" component={Dashboard}/>
      </Switch>
     </BrowserRouter>
  ), 
  document.getElementById('react-app')
)
