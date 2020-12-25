import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import axios from 'axios';

class StoreCard extends Component {
    constructor() {
        super()
        this.state =
        {
            id: localStorage.getItem('id'),
            gameid: 0,
            type: "buyGame",
            checkBI: false,
            checkBI2: false,
            checkAI: false,
            checkAI2: false,
            price: 0,
        }
        this.buyGame = this.buyGame.bind(this);
        this.addWishlist = this.addWishlist.bind(this);
    }

    async buyGame(event) {
        event.preventDefault();
    
        this.setState({ type: "buyGame", gameid: event.target.value}, function () {
            const API_PATH = 'http://localhost:8000/adexBackend/api/userStore.php';

            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: this.state
            })
                .then(result => {
                    if(result.data.checkBI2)
                    {
                        console.log(result.data.gameid + " true")
                        this.setState({ checkBI: true, checkBI2: true, gameid: result.data.gameid});
                    }
                    else
                    {
                        console.log(result.data.gameid + " false")
                        this.setState({ checkBI: true, checkBI2: false });
                    }
                    
                })
                .catch(error => this.setState({ error: error.message }));
        });
    }

    async addWishlist(event) {
        event.preventDefault();
    
        this.setState({ type: "addWishlist", gameid: event.target.value}, function () {
            const API_PATH = 'http://localhost:8000/adexBackend/api/userStore.php';

            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: this.state
            })
                .then(result => {
                    if(result.data.checkAI2)
                    {
                        this.setState({ checkAI: true, checkAI2: true, gameid: result.data.gameid});
                    }
                    else
                    {
                        this.setState({ checkAI: true, checkAI2: false, });
                    }
                    
                })
                .catch(error => this.setState({ error: error.message }));
        });
    }

    render() {
        let userFeed = this.props.datas.map(function (datas) {
            return (
                <Card key={datas.gameID} style={{ width: '90vw', margin: '2vw 5vw 2vw 5vw', }}>
                    <CardImg top src={datas.imageO} alt="..." />
                    <CardBody>
                        <ListGroup flush>
                            <ListGroupItem><CardTitle><h3>{datas.game_name} ${datas.price}</h3></CardTitle></ListGroupItem>
                            <ListGroupItem>{this.state.checkBI && this.state.gameid === datas.gameID ? this.state.checkBI2 ? <h6 style={{ color: 'green', paddingBottom: '10px' }}>Game Succesfully Bought</h6> :
                                <h6 style={{ color: 'red', paddingBottom: '10px' }}>Increase Balance</h6> : ''}
                                <Button value={datas.gameID} color="primary" onClick={this.buyGame}>Buy</Button></ListGroupItem>
                            <ListGroupItem><Button>Comments</Button></ListGroupItem>
                            <ListGroupItem><Button color="success">Rewiews</Button></ListGroupItem>
                            <ListGroupItem>{this.state.checkAI && this.state.gameid === datas.gameID ? this.state.checkAI2 ? 
                            <h6 style={{ color: 'green', paddingBottom: '10px' }}>Game Succesfully Added To Wishlist</h6> : <h6 style={{ color: 'red', paddingBottom: '10px' }}>Allready In Wishlist</h6> : ''}
                                <Button value={datas.gameID} color="danger" onClick={this.addWishlist}>Add To Wishlist</Button></ListGroupItem> 
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

export default StoreCard;