import React, { Component } from 'react';
import { Progress , Card, CardImg, CardBody, CardTitle, ListGroup, ListGroupItem, Button, Label, Input } from 'reactstrap';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

class StoreCard extends Component {
    constructor() {
        super()
        this.state =
        {
            id: localStorage.getItem('id'),
            gameID: 0,
            type: "seeReviews",
            checkRI: false,
            reviews: [],
            price: 0,
            checkRII: false,
            checkRI2: false,
            rating: 1,
            rewText: "",
        }
        this.seeReviews = this.seeReviews.bind(this);
        this.createReview = this.createReview.bind(this);
        this.seeReviewMaker = this.seeReviewMaker.bind(this);
        this.changeRating = this.changeRating.bind(this);
        this.changeReview = this.changeReview.bind(this);
    }

    changeRating(e) {
        const val = e.target.value;
        this.setState({ rating: val });
    }

    changeReview(e) {
        const val = e.target.value;
        this.setState({ rewText: val });
    }

    async seeReviewMaker(event) {
        event.preventDefault();
        if (this.state.checkRI2) {
            this.setState({ checkRI2: false, checkRII: false, gameID: event.target.value });
        }
        else {
            this.setState({ checkRI: false, checkRI2: true, gameID: event.target.value });
        }
    }

    async createReview(event) {
        event.preventDefault();
        this.setState({ type: "createReview" }, function () {
            const API_PATH = 'http://localhost:8000/adexBackend/api/curatorStore.php';

            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: this.state
            })
                .then(result => {
                    console.log(result.data.checkRII)
                    this.setState({ checkRII: result.data.checkRII });
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
            this.setState({ type: "seeReviews", checkRI: false, checkRII: false, checkRI2: false, gameID: event.target.value }, function () {
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
                            <ListGroupItem><CardTitle><h3>{datas.game_name}</h3></CardTitle></ListGroupItem>
                            <ListGroupItem><Button value={datas.gameID} color="danger" onClick={this.seeReviews}>Reviews</Button>
                                {this.state.checkRI && datas.gameID === this.state.gameID ?
                                    <div className="Reviews">
                                        {reviewsDD}
                                    </div>
                                    : ""}
                            </ListGroupItem>
                            <ListGroupItem><Button value={datas.gameID} color="info" onClick={this.seeReviewMaker}>Make a review</Button>
                                {this.state.checkRII && datas.gameID === this.state.gameID ?
                                    <h6 style={{ color: 'green', paddingBottom: '10px' }}>Succesfully Added Review</h6> : ""}
                                {this.state.checkRI2 && datas.gameID === this.state.gameID ?
                                    <form value={datas.gameID} className="form buildMod" style={{ display: "grid" }} method="POST" onSubmit={this.createReview}>
                                        <TextField
                                            multiline
                                            required
                                            rows={3}
                                            margin="normal"
                                            width="20rem"
                                            height="10rem"
                                            name="balanceInc"
                                            label="Review"
                                            type="text"
                                            id="balanceInc"
                                            variant="filled"
                                            onChange={this.changeReview}
                                            value={this.state.rewText}
                                        />
                                        <h3 style={{ marginBottom: "20px", marginTop: "15px" }}><b>Rating</b></h3>
                                        <div className="rating" style={{ marginBottom: "10px" }}>
                                            <div className="form-check-radio form-check-inline">
                                                <Label className="form-check-label">
                                                    <Input type="radio" name="exampleRadios1" id="exampleRadios11" value="1" onChange={this.changeRating} defaultChecked />
                                                1
                                                <span className="form-check-sign"></span>
                                                </Label>
                                            </div>
                                            <div className="form-check-radio form-check-inline">
                                                <Label className="form-check-label">
                                                    <Input type="radio" name="exampleRadios1" id="exampleRadios12" value="2" onChange={this.changeRating} />
                                            2
                                            <span className="form-check-sign"></span>
                                                </Label>
                                            </div>
                                            <div className="form-check-radio form-check-inline">
                                                <Label className="form-check-label">
                                                    <Input type="radio" name="exampleRadios1" id="exampleRadios13" value="3" onChange={this.changeRating} />
                                            3
                                            <span className="form-check-sign"></span>
                                                </Label>
                                            </div>
                                            <div className="form-check-radio form-check-inline">
                                                <Label className="form-check-label">
                                                    <Input type="radio" name="exampleRadios1" id="exampleRadios14" value="4" onChange={this.changeRating} />
                                            4
                                            <span className="form-check-sign"></span>
                                                </Label>
                                            </div>
                                            <div className="form-check-radio form-check-inline">
                                                <Label className="form-check-label">
                                                    <Input type="radio" name="exampleRadios1" id="exampleRadios15" value="5" onChange={this.changeRating} />
                                            5
                                            <span className="form-check-sign"></span>
                                                </Label>
                                            </div>
                                        </div>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="success"
                                            className="submit"
                                            value={datas.gameID}
                                        >
                                            Review
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

export default StoreCard;