import React, { Component } from 'react';
import { Progress, Card, CardImg, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import axios from 'axios';

class WishlistCard extends Component {
    constructor() {
        super()
        this.state =
        {
            id: localStorage.getItem('id'),
            gameid: 0,
            type: "buyGame",
            checkBI: false,
            checkBI2: false,
            checkW: false,
            price: 0,
            reviews: [],
            checkRI: false,
        }
        this.seeReviews = this.seeReviews.bind(this);
        this.buyGame = this.buyGame.bind(this);
        this.removeWishlist = this.removeWishlist.bind(this);
    }

    async buyGame(event) {
        event.preventDefault();
    
        this.setState({ type: "buyGame", gameid: event.target.value}, function () {
            const API_PATH = 'http://localhost:8000/adexBackend/api/userWishlist.php';

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

    async removeWishlist(event) {
        event.preventDefault();
    
        this.setState({ type: "removeWishlist", gameid: event.target.value}, function () {
            const API_PATH = 'http://localhost:8000/adexBackend/api/userWishlist.php';

            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: this.state
            })
                .then(result => {
                    if(result.data.checkW)
                    {
                        this.setState({ checkW: true});
                    }
                    else
                    {
                        this.setState({ checkW: false });
                    }
                    
                })
                .catch(error => this.setState({ error: error.message }));
        });
    }

    async seeReviews(event) {
        event.preventDefault();
        if (this.state.checkRI) {
            this.setState({ checkRI: false });
        }
        else {
            this.setState({ type: "seeReviews", checkRI: false, gameID: event.target.value }, function () {
                const API_PATH = 'http://localhost:8000/adexBackend/api/curatorStore.php';

                axios({
                    method: 'post',
                    url: `${API_PATH}`,
                    headers: { 'content-type': 'application/json' },
                    data: this.state
                })
                    .then(result => {
                        this.setState({ reviews: result.data.reviews });
                    })
                    .catch(error => this.setState({ error: error.message }));
                this.setState({ checkRI: true });
            });
        }
    }

    render() {
        let reviewsDD = <div> hakan</div>
        if (this.state.checkRI) {
            reviewsDD = this.state.reviews.map(function (reviewsD, index) {
                return (
                    <div key={index} style = {{border: "2px solid gray", padding: "20px", margin: "5px", borderRadius: "20px"}}>
                        <h2 style={{marginTop: "0px"}}><b>{reviewsD.username}</b></h2>
                        <h5><u><i>{reviewsD.textO}</i></u></h5>
                        <div className="progress-container progress-success">
                            <span className="progress-badge">Rating</span>
                            <Progress
                                max="100"
                                value={reviewsD.ratingO * 100 / 5} 
                                barClassName="progress-bar-success"
                            />
                        </div>
                    </div>
                )
            }, this).reverse();
        }
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
                            <ListGroupItem><Button value={datas.gameID} color="success" onClick={this.seeReviews}>Reviews</Button>
                                {this.state.checkRI && datas.gameID === this.state.gameID ?
                                    <div className="Reviews">
                                        {reviewsDD}
                                    </div>
                                    : ""}
                            </ListGroupItem>
                            <ListGroupItem>{this.state.checkW && this.state.gameid === datas.gameID ? 
                            <h6 style={{ color: 'green', paddingBottom: '10px' }}>Game Succesfully Removed From The Wishlist</h6> : ''}
                                <Button value={datas.gameID} color="danger" onClick={this.removeWishlist}>Remove From Wishlist</Button></ListGroupItem> 
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

export default WishlistCard;