import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./LoginComponent.css";


class LoginComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: "",
            room: "",
            usererror: "",
            roomerror: ""
        }
        this.submitUsername = this.submitUsername.bind(this);
        this.submitRoom = this.submitRoom.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    handleValidation(event) {
        if (!this.state.room) {
            this.setState({
                roomerror: "Room field cannot be left empty"
            })
            event.preventDefault();
        }

        if (!this.state.username) {
            this.setState({
                usererror: "User field cannot be left empty"
            })
            event.preventDefault();
        }


    }

    submitUsername(event) {
        this.setState({
            usererror: ''
        });
        this.setState({
            username: event.target.value
        })

    }

    submitRoom(event) {
        this.setState({
            roomerror:''
        })
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
                    <br />
                    <label className="errorLabel">{this.state.usererror}</label>
                </div>
                <div>
                    <input type="text" className="login-input" placeholder="Enter A Room To Join" value={this.state.room} onChange={this.submitRoom}></input>
                    <br />
                    <label className="errorLabel">{this.state.roomerror}</label>
                </div>
                <div className="login-row">
                    <Link onClick={this.handleValidation} to={`/chat?name=${this.state.username}&room=${this.state.room}`}>
                        <button className="login-btn" type="submit">Sign In</button>
                    </Link>
                </div>
            </div>
        </div>
    }
}

export default LoginComponent;