import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, ListGroup, ListGroupItem, Button, Badge } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class LibraryCard extends Component {
    constructor() {
        super()
        this.state =
        {
            id: localStorage.getItem('id'),
            type: "seeMods",
            checkMI: false,
            mods: [],
            gameID: 0,
            checkMI2: false,
            checkBI: false,
            curM: "",
        }
        this.seeMods = this.seeMods.bind(this);
        this.seeBuild = this.seeBuild.bind(this);
        this.buildMod = this.buildMod.bind(this);
        this.changeM = this.changeM.bind(this);
    }

    changeM(e) {
        const val = e.target.value;
        this.setState({ curM: val });
    }

    async seeBuild(event) {
        event.preventDefault();
        //Balance Increase Div Show
        if (this.state.checkMI2) {
            this.setState({ checkMI2: false, checkBI: false, gameID: event.target.value });
        }
        else {
            this.setState({ checkMI2: true, gameID: event.target.value });
        }
    }

    async buildMod(event) {
        event.preventDefault();
        this.setState({ type: "buildMod" }, function () {
            const API_PATH = 'http://localhost:8000/adexBackend/api/userLibrary.php';

            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: this.state
            })
                .then(result => {
                    console.log(result.data.checkBI)
                    this.setState({ checkBI: result.data.checkBI });
                })
                .catch(error => this.setState({ error: error.message }));
        });
    }

    async seeMods(event) {
        event.preventDefault();
        //Balance Increase Div Show
        if (this.state.checkMI) {
            this.setState({ checkMI: false });
        }
        else {
            this.setState({ type: "seeMods", checkMI: false, gameID: event.target.value }, function () {
                const API_PATH = 'http://localhost:8000/adexBackend/api/userLibrary.php';

                axios({
                    method: 'post',
                    url: `${API_PATH}`,
                    headers: { 'content-type': 'application/json' },
                    data: this.state
                })
                    .then(result => {
                        this.setState({ mods: result.data.modes });
                    })
                    .catch(error => this.setState({ error: error.message }));
                this.setState({ checkMI: true });
            });
        }
    }

    render() {
        let modsDD = <div> hakan</div>
        if (this.state.checkMI) {
            modsDD = this.state.mods.map(function (modsD, index) {
                return (
                    <ListGroup key={index} flush>
                        <ListGroupItem>
                            <Button color="warning" disabled>{index + 1}: {modsD.modeO}</Button>
                        </ListGroupItem>
                    </ListGroup>
                )
            }, this).reverse();
        }

        let userFeed = this.props.datas.map(function (datas) {
            return (
                <Card key={datas.gameID} style={{ width: '90vw', margin: '2vw 5vw 2vw 5vw', }}>
                    <CardImg top src={datas.imageO} alt="..." />
                    <CardBody>
                        <ListGroup flush>
                            <ListGroupItem><CardTitle><h3>{datas.game_name}</h3></CardTitle></ListGroupItem>
                            <ListGroupItem><Button color="primary">Play</Button></ListGroupItem>
                            <ListGroupItem><Button>Comments</Button></ListGroupItem>
                            <ListGroupItem><Button color="success">Rewiews</Button></ListGroupItem>
                            <ListGroupItem><Button value={datas.gameID} color="danger" onClick={this.seeMods}>Mods</Button>
                                {this.state.checkMI && datas.gameID === this.state.gameID ?
                                    <div className="Mods">
                                        {modsDD}
                                    </div>
                                    : ""}
                            </ListGroupItem>
                            <ListGroupItem><Button value={datas.gameID} color="info" onClick={this.seeBuild}>Build Mod</Button>
                                {this.state.checkBI && datas.gameID === this.state.gameID ?
                                    <h6 style={{ color: 'green', paddingBottom: '10px' }}>Built Succesfully</h6> : ""}
                                {this.state.checkMI2 && datas.gameID === this.state.gameID ?
                                    <form value={datas.gameID} className="form buildMod" style={{ display: "grid" }} method="POST" onSubmit={this.buildMod}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            width="20rem"
                                            name="balanceInc"
                                            label="Mod Name"
                                            type="text"
                                            id="balanceInc"
                                            onChange={this.changeM}
                                            value={this.state.curM}
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="success"
                                            className="submit"
                                            value={datas.gameID}
                                        >
                                            Build
                                    </Button> :
                                </form> : ""}
                            </ListGroupItem>
                        </ListGroup>
                    </CardBody>
                </Card>
            )
        }, this).reverse();
        return (
            <div>
                {userFeed}
            </div>
        );
    }

}

export default LibraryCard;