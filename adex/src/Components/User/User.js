import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom";
import HeaderU from "./Navbars/Navbar.js"
import FooterU from "./Footers/Footer.js"
import Main from "./UserComponents/Main.js"
import Store from "./UserComponents/Store.js"
import Library from "./UserComponents/Library.js"
import Wishlist from "./UserComponents/Wishlist.js"

class User extends Component {
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
        <div className="App" style = {{backgroundColor: 'darkgray', color: 'white'}}>
            <HeaderU />
            <Route path="/user/main"><Main /></Route>
            <Route path="/user/store"><Store /></Route>
            <Route path="/user/library"><Library /></Route>
            <Route path="/user/wishlist"><Wishlist /></Route>
            <FooterU />
        </div>
      </Router>
    )
  }
}

export default User;

