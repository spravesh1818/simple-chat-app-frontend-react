import React, { Component } from "react";
import io from 'socket.io-client';
import queryString from 'query-string';
import "./ChatScreenComponent.css";
import HeaderComponent from "../headerComponent/HeaderComponent";
import ChatListComponent from '../chatListComponent/ChatListComponent';
import ChatComposeComponent from "../chatComposeComponent/chatComposeComponent";
import OnlineUsersComponent from "../onlineUserComponent/OnlineUsersComponent";
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
            users: [],
        }
        this.setMessage = this.setMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.exitRoom = this.exitRoom.bind(this);
        this.scrollref = React.createRef();
        this.scrollRefEvent = this.scrollRefEvent.bind(this);
    }

    exitRoom() {
        console.log("Exit button clicked");
        console.log(socket);
        socket.close();
        this.props.history.push("/login");
    }

    sendMessage(event) {
        event.preventDefault();
        console.log(this.scrollref);
        if (this.state.message !== '') {
            socket.emit('sendMessage', { message: this.state.message }, () => {
                this.setState({
                    message: ''
                })
            });
        }
    }

    scrollRefEvent() {
        this.scrollref.current.scrollIntoView({ behaviour: "smooth" });
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
                this.props.history.push({
                    pathname: '/login',
                    state: { alertMessage:'Username already taken.Please use some other name' }
                });

            }
        });

        socket.on('loadAllMessages', (messages) => {
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
        });


        this.scrollRefEvent();

    }

    componentDidUpdate() {
        this.scrollRefEvent();
    }






    render() {
        return (<>
            <div className="chat-screen-container">
                <HeaderComponent roomName={this.state.room} exitRoom={this.exitRoom}></HeaderComponent>

                <div className="chat-screen-body">




                    <OnlineUsersComponent onlineusers={this.state.users}></OnlineUsersComponent>
                    <div className="chat-screen-messagebox">

                        <ChatListComponent reference={this.scrollref} messages={this.state.messages} username={this.state.username}></ChatListComponent>
                        <ChatComposeComponent message={this.state.message} setMessage={this.setMessage} sendMessage={this.sendMessage}></ChatComposeComponent>
                    </div>
                </div>
            </div>
        </>)
    }
}

export default ChatScreenComponent;