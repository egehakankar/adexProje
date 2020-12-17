import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import logo from '../Images/logoB.png';

import "../CSS/SignIn.css";

class HomePage extends Component {
    constructor() {
        super()
        this.state =
        {
            age: 'User',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const val = e.target.value;
        console.log(val);
        this.setState({ age: val });
    }

    render() {
        if(localStorage.getItem["type"] !== "User" || localStorage.getItem["id"] === 0)
        {
            return <div>{localStorage.getItem["type"]} {localStorage.getItem["id"]}</div>
        }
        else
        {
            return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className="paper">
                    <img src={logo} alt="Logo" style = {{width: '396px'}}/>
                        <form className="form" noValidate>
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
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="username"
                                label="Username"
                                type="text"
                                id="username"
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
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
                            />
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                            >
                                Sign Up
                      </Button>
                            <Grid container className="SignIn">
                                <Grid item>
                                    <Link href="./SignIn" variant="body2">
                                        {localStorage.getItem("id")}
                                        {"hoooop have an acount? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            )
        }
    }
}

export default HomePage;