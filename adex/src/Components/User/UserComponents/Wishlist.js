import React, { Component } from 'react';
import axios from 'axios';
import WishlistCards from "./WishlistCards/WishlistCard.js"
import { Label, Input } from "reactstrap";

import "./WishlistCards/wishlist.css"

class Wishlist extends Component {
    constructor() {
        super()
        this.state =
        {
            type: "getGames",
            games: [],
            check: false,
            id: localStorage.getItem("id"),
        }
        this.getGames = this.getGames.bind(this);
    }

    componentDidMount() {
        this.getGames()
    }

    getGames() {
        const API_PATH = 'http://localhost:8000/adexBackend/api/userWishlist.php';
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            data: this.state
        })
            .then(result => {
                console.log(result.data.games);
                let res = result.data.games
                if (res) {
                    console.log(result.data.games);
                    this.setState({ data: result.data.games, check: true });
                }
            })
            .catch(error => this.setState({ error: error.message }));
    }

    render() {
        return (
            <div className="Wishlist">
                <div className="UserStore">
                    {this.state.check ? <WishlistCards className="cards" datas={this.state.data}></WishlistCards> : ''}

                </div>
            </div>
        )
    }
}

export default Wishlist;