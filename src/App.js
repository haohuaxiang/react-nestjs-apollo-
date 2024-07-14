import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import React from 'react'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/logout">
            <Logout></Logout>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
