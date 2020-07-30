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
        this.exitRoom=this.exitRoom.bind(this);
    }


    exitRoom(){
        socket.emit('disconnect');
        this.props.history.push("/login");
    }

    sendMessage(event) {
        event.preventDefault();
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

        socket.on('loadAllMessages',(messages)=>{
            this.setState({
                messages
            })
        })

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
        const messages = this.state.messages.map((message) => {
            if (message.user === this.state.username.toLowerCase()) {
                return <div className="chat-screen-message-sent-message">
                    <div className="chat-screen-message-text">{message.text}</div>
                    <div className="chat-screen-message-user">{message.user}</div>
                </div>;
            } else if (message.user === "System") {
                return <div className="chat-screen-message-system-message">
                    <div className="chat-screen-message-text">{message.text}</div>
                    <div className="chat-screen-message-user">{message.user}</div>
                </div>
            } else {
                return <div className="chat-screen-message-received-message">
                    <div className="chat-screen-message-text">{message.text}</div>
                    <div className="chat-screen-message-user">{message.user}</div>
                </div>
            }
        })
    
        const onlineUsers = this.state.users.map((user) =>
            <div className="contact">
                <div className="text">
                    <h4>{user.name}</h4>
                </div>
            </div>);

        return (<>
            <div className="chat-screen-container">
                <div className="chat-screen-header">
                    <div className="chat-room-name">
                        <label className="chat-room-name-label">
                            Room:{this.state.room}
                        </label>
                    </div>
                    <div className="chat-room-exit">
                        <button className="chat-room-exit-btn" onClick={this.exitRoom}>Exit Room</button>
                    </div>
                </div>





                <div className="chat-screen-body">
                    <div className="chat-screen-messagebox">
                        <div className="chat-screen-message-list">
                            {messages}
                        </div>
                        
                        <div className="chat-screen-message-compose">
                            <form onSubmit={this.sendMessage}>
                                <input className="chat-screen-input" type="text" value={this.state.message} onChange={this.setMessage}></input>
                                <button type="submit" className="chat-screen-btn">Send</button>
                            </form>
                        </div>

                    </div>


                    <div className="chat-screen-online-user">
                        <div className="header">
                            <h2> Online</h2>
                        </div>
                        <div className="chat-screen-online-user-list">
                            {onlineUsers}
                        </div>
                    </div>

                </div>
            </div>
        </>)
    }
}

export default ChatScreenComponent;