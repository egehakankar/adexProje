import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import SignIn from "./Components/SignIn.js"
import SignUp from "./Components/SignUp.js"
import User from "./Components/User/User.js"
import Curator from "./Components/Curator/Curator.js"

class App extends Component {
  constructor() {
    super()
    this.state =
    {
      mount: false,
    }
  }

  componentDidMount() {
    this.setState(state => ({
      mount: true,
    }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/signin"><SignIn /></Route>
          <Route exact path="/signup"><SignUp /></Route>
          <Route path="/user"><User /></Route>
          <Route path="/curator"><Curator /></Route>
        </div>
      </Router>
    )
  }
}

export default App;

