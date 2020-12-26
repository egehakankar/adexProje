import React, { Component } from 'react';
import axios from 'axios';
import StoreCards from "./StoreCards/StoreCard.js"
import { Button } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { Card, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import { Label, Input } from "reactstrap";


import "./StoreCards/store.css"

class Store extends Component {
    constructor() {
        super()
        this.state =
        {
            type: "getGames",
            games: [],
            check: false,
            id: localStorage.getItem("id"),
            category: "action",
        }
        this.getGames = this.getGames.bind(this);
        this.changeC = this.changeC.bind(this);
    }

    componentDidMount() {
        this.getGames()
    }

    changeC(e) {
        const val = e.target.value;
        this.setState({ category: val, type: "getGames", }, function () {
            this.getGames();
        });
    }

    getGames() {
        const API_PATH = 'http://localhost:8000/adexBackend/api/curatorStore.php';
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
                let res = result.data.games
                if (res) {
                    this.setState({ data: result.data.games, check: true });
                }
            })
            .catch(error => this.setState({ error: error.message }));
    }

    render() {
        return (
            <div className="Store">
                <div className="categories">
                    <h1><u>Categories</u></h1>
                    <Label className="form-check-label">
                        <Input className="cate" type="radio" name="exampleRadios" id="exampleRadios1" value="action" onChange={this.changeC} defaultChecked />
                        <h3>Action</h3>
                    </Label>
                    <Label className="form-check-label">
                        <Input className="cate" type="radio" name="exampleRadios" id="exampleRadios2" value="fps" onChange={this.changeC} />
                        <h3>FPS</h3>
                    </Label>
                    <Label className="form-check-label">
                        <Input className="cate" type="radio" name="exampleRadios" id="exampleRadios2" value="sport" onChange={this.changeC} />
                        <h3>Sport</h3>
                    </Label>
                </div>
                <div className="UserStore">
                    {this.state.check ? <StoreCards className="cards" datas={this.state.data}></StoreCards> : ''}

                </div>
            </div>
        )
    }
}

export default Store;