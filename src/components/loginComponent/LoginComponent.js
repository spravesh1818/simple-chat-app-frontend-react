import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./LoginComponent.css";


class LoginComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: "",
            room: ""
        }
        this.submitUsername = this.submitUsername.bind(this);
        this.submitRoom = this.submitRoom.bind(this);
    }

    submitUsername(event) {
        console.log(event.target.value)
        this.setState({
            username: event.target.value
        })
    }

    submitRoom(event) {
        console.log(event.target.value);
        this.setState({
            room: event.target.value
        })
    }


    render() {
        return <div className="login-container">
            <div className="login-form">
                <div className="login-label-div"><label >Login</label></div>
                <div>
                    <input type="text" className="login-input" placeholder="Enter A Username" value={this.state.username} onChange={this.submitUsername}></input>
                </div>
                <div>
                    <input type="text" className="login-input" placeholder="Enter A Room To Join" value={this.state.room} onChange={this.submitRoom}></input>
                </div>
                <div className="login-row">
                    <Link onClick={event => (!this.state.username) ? event.preventDefault() : null} to={`/chat?name=${this.state.username}&room=${this.state.room}`}>
                        <button className="login-btn" type="submit">Sign In</button>
                    </Link>
                </div>
            </div>
        </div>
    }
}

export default LoginComponent;