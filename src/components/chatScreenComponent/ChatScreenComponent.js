import React, { Component } from "react";
import io from 'socket.io-client';
import queryString from 'query-string';
import "./ChatScreenComponent.css";

let socket;
const END_POINT = "localhost:5000";

class ChatScreenComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            room: "",
            messages: [],
            message: "",
            users: []
        }

        this.setMessage = this.setMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

    }

    sendMessage(event) {
        event.preventDefault();
        console.log(this.state.message);
        socket.emit('sendMessage', { message: this.state.message }, () => {
            this.setState({
                message: ''
            })
        });
    }

    setMessage(event) {
        event.preventDefault();
        this.setState({
            message: event.target.value
        })
    }

    componentWillUnmount() {
        socket.emit('disconnect');
        socket.off();
    }

    componentDidMount() {
        const { name, room } = queryString.parse(this.props.location.search);

        socket = io(END_POINT);

        this.setState({
            username: name,
            room: room
        })

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                this.props.history.push("/login");
            }
        });

        socket.on('message', (message) => {
            this.setState({
                messages: [...this.state.messages, message]
            })
        });

        socket.on('usersInRoom', ({ users }) => {
            this.setState({
                users: users
            })
        })

    }




    render() {

        const messages = this.state.messages.map((message) =>
            <li>{message.user}:{message.text}</li>);

        const onlineUsers = this.state.users.map((user) =>
        <div class="contact">
        <div class="text">
            <h4>{user.name}</h4>
        </div>
    </div>);

        return (<>
            <div className="chat-screen-container">
                <div className="chat-screen-header">
                    {/*
                    an element to show the room
                    another element to exit the room
                  */}
                    <div className="chat-room-name">
                        <label className="chat-room-name-label">
                            Room:{this.state.room}
                        </label>
                    </div>
                    <div className="chat-room-exit">
                        <button className="chat-room-exit-btn">Exit</button>
                    </div>
                </div>
                <div className="chat-screen-body">
                    <div className="chat-screen-messagebox">
                        <div className="chat-screen-messages">
                            <ul>{messages}</ul>
                        </div>
                        <div className="chat-screen-message-compose">
                            <form onSubmit={this.sendMessage}>
                                <textarea className="chat-screen-input" type="text" value={this.state.message} onChange={this.setMessage}></textarea>
                                <button type="submit" className="chat-screen-btn">Send</button>
                            </form>
                        </div>

                    </div>
                    <div class="chat-screen-online-user">
                        <div class="header">
                            <h2> Online</h2>
                        </div>
                        <div class="chat-screen-online-user-list">
                            {onlineUsers}
                        </div>
                    </div>

                </div>
            </div>
            <div className="chat-screen-header">

            </div>
        </>)
    }
}

export default ChatScreenComponent;