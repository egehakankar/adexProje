import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import logo from './Images/logoB.png';

import "./CSS/SignIn.css"

class SignIn extends Component {
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
                            id="email"
                            label="Email Address & Username"
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
                            autoComplete="current-password"
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