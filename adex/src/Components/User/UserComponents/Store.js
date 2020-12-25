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
            checkB: false,
            id: localStorage.getItem("id"),
            checkBI: false,
            curBalance: 0,
            incB: 0,
            category: "action",
        }
        this.getGames = this.getGames.bind(this);
        this.incO = this.incO.bind(this);
        this.increaseBalance = this.increaseBalance.bind(this);
        this.changeB = this.changeB.bind(this);
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

    changeB(e) {
        const val = e.target.value;
        this.setState({ incB: val });
    }

    getGames() {
        const API_PATH = 'http://localhost:8000/adexBackend/api/userStore.php';
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

    async incO() {
        //Balance Increase Div Show
        if (this.state.checkB) {
            this.setState({ checkB: false });
            this.setState({ type: "userBalance" });
        }
        else {
            this.setState({ type: "userBalance", checkB: false, }, function () {
                const API_PATH = 'http://localhost:8000/adexBackend/api/userStore.php';

                axios({
                    method: 'post',
                    url: `${API_PATH}`,
                       headers: { 'content-type': 'application/json' },
                    data: this.state
                })
                    .then(result => {
                        this.setState({ curBalance: result.data.balance });
                    })
                    .catch(error => this.setState({ error: error.message }));
                this.setState({ checkB: true });
            });
        }

    }

    async increaseBalance(event) {
        event.preventDefault();

        this.setState({ type: "balanceInc", }, function () {
            const API_PATH = 'http://localhost:8000/adexBackend/api/userStore.php';
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: this.state
            })
                .then(result => {
                    if (result.data.checkBI) {
                        this.setState({ checkBI: true, curBalance: result.data.balance });
                    }
                    else {
                        this.setState({ checkBI: false });
                    }
                })
                .catch(error => this.setState({ error: error.message }));
        });
    }

    render() {
        return (
            <div className="Store">
                <div className="balanceDiv">
                    <Button className="balance btn-round btn-icon" color="success" onClick={this.incO}>
                        Increase Balance
                    </Button>
                    {this.state.checkB ?
                        <div className="input field agaBak">
                            <form className="form" method="POST" onSubmit={this.increaseBalance}>
                                <div className="balanceC" >
                                    <Card className="balanceCO" style={{ width: '20rem' }}>
                                        <CardBody>
                                            <ListGroup flush>
                                                <ListGroupItem>Current Balance: {this.state.curBalance}</ListGroupItem>
                                                <ListGroupItem><TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    width="20rem"
                                                    name="balanceInc"
                                                    label="Add Balance"
                                                    type="text"
                                                    id="balanceInc"
                                                    onChange={this.changeB}
                                                    value={this.state.incB}
                                                /></ListGroupItem>
                                                <ListGroupItem><Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="danger"
                                                    className="submit"
                                                >
                                                    Increase
                                            </Button></ListGroupItem>
                                            </ListGroup>
                                        </CardBody>
                                    </Card>
                                </div>

                            </form>
                        </div>
                        : ''}
                </div>
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