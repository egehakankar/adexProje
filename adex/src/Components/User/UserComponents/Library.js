import React, { Component } from 'react';
import axios from 'axios';
import LibraryCards from "./LibraryCards/LibraryCards.js"
import { Button } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { Card, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import { Label, Input } from "reactstrap";


import "./LibraryCards/library.css"

class Library extends Component {
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
        const API_PATH = 'http://localhost:8000/adexBackend/api/userLibrary.php';
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
            <div className="Library">
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
                    {this.state.check ? <LibraryCards className="cards" datas={this.state.data}></LibraryCards> : ''}

                </div>
            </div>
        )
    }
}

export default Library;