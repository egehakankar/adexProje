import { Component } from 'react';
import Back from './back.jpg';


class Main extends Component {
    render() {
        return (
            <div className="Main" style={{backgroundSize: "cover", width: '99.1vw', height: '89.2vh', backgroundImage: `url(${Back})` }}>
                    <h1 style = {{fontSize: "70px",padding: "30vh 0 0 0", margin: "0", fontWeight: "bolder"}}>Welcome to ADEX</h1>
                    <h3>Have fun!!!</h3>
            </div>
        )
    }
}

export default Main;