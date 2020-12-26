import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom";
import HeaderU from "./Navbars/Navbar.js"
import FooterU from "./Footers/Footer.js"
import Main from "./CuratorComponents/Main.js"
import Store from "./CuratorComponents/Store.js"

class Curator extends Component {
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
        <div className="App" style={{ backgroundColor: '#273e4a', color: 'white' }}>
          <HeaderU />
          <Route path="/curator/main"><Main /></Route>
          <Route path="/curator/store"><Store /></Route>
          <FooterU />
        </div>
      </Router>
    )
  }
}

export default Curator;

