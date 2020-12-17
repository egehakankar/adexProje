import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import logo from './Images/logoB.png';
import axios from 'axios';

import "./CSS/SignIn.css"

class SignIn extends Component {
    constructor() {
        super()
        this.state =
        {
            check: false,
            age: 'User',
            emailUsername: '',
            passwordO: '',
            error: false,
            errorNo: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.emailUser = this.emailUser.bind(this);
        this.passwordF = this.passwordF.bind(this);
        this.submitH = this.submitH.bind(this);
    }

    componentDidMount() {
        
        localStorage.setItem("type", "none");
        localStorage.setItem("id", "0");

      }

    handleChange(e) {
        const val = e.target.value;
        this.setState({ age: val });
    }

    emailUser(e) {
        const val = e.target.value;
        this.setState({ emailUsername: val });
    }

    passwordF(e) {
        const val = e.target.value;
        this.setState({ passwordO: val });
    }

    async submitH(event) {
        event.preventDefault();

        const API_PATH = 'http://localhost:8000/adexBackend/api/login.php';
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: this.state
        })
            .then(result => {
                if(result.data.check)
                {
                    localStorage.setItem("type", this.state.age);
                    localStorage.setItem("id", result.data.id);
                    this.setState({ errorNo: false });
                }
                else
                {
                    this.setState({ errorNo: true });
                }
                this.setState({
                    check: result.data.check
                })
                
            })
            .catch(error => this.setState({ error: error.message }));
        }

    render() {
        if(this.state.check) 
        {
            return <Redirect to="./userhomepage" />
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paper">
                    <img src={logo} alt="Logo" style={{ width: '396px' }} />
                    <form className="form" method="POST" onSubmit={this.submitH}>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.age}
                            onChange={this.handleChange}
                            variant="outlined"
                        >
                            <MenuItem value="User">User</MenuItem>
                            <MenuItem value="Curator">Curator</MenuItem>
                            <MenuItem value="Publisher">Publisher</MenuItem>
                            <MenuItem value="Developer">Developer</MenuItem>
                        </Select>
                        {this.state.errorNo ? <div>Enter a valid account.</div> : ''}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address & Username"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.emailUser}
                            value={this.state.emailUsername}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.passwordF}
                            value={this.state.passwordO}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit"
                        >
                            Sign In
                  </Button>
                        <Grid container className="SignUp">
                            <Grid item>
                                <Link href="./SignUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

export default SignIn;