import React, { Component } from "react";
import io from 'socket.io-client';
import queryString from 'query-string';

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
            users:[]
        }

        this.setMessage = this.setMessage.bind(this);
        this.sendMessage=this.sendMessage.bind(this);

    }

    sendMessage(event){
        event.preventDefault();
        console.log(this.state.message);
        socket.emit('sendMessage',{message:this.state.message},()=>{
            this.setState({
                message:''
            })
        });
    }
    
    setMessage(event) {
        event.preventDefault();
        this.setState({
            message:event.target.value
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

        socket.emit('join', { name, room },(error)=>{
            if(error){
                this.props.history.push("/login");
            }
        });

        socket.on('message',(message)=>{
            this.setState({
                messages:[...this.state.messages,message]
            })
        });

        socket.on('usersInRoom',({users})=>{
            this.setState({
                users:users
            })
        })
        
    }

    


    render() {
    
        const messages = this.state.messages.map((message) => 
            <li>{message.user}:{message.text}</li>);

        const onlineUsers = this.state.users.map((user) => 
            <li>{user.name}</li>);
       
        return (<>
            Welcome {this.state.username}

            <ul>
                {messages}
            </ul>


            <p>OnlineUsers</p>
            <ul>
                {onlineUsers}
            </ul>

            <form onSubmit={this.sendMessage}>
                <input type="text" value={this.state.message} onChange={this.setMessage}></input>
                <button type="submit">Send</button>
            </form>



        </>)
    }
}

export default ChatScreenComponent;