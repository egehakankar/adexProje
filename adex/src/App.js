import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import SignIn from "./Components/SignIn.js"
import SignUp from "./Components/SignUp.js"

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
        </div>
      </Router>
    )
  }
}

export default App;

