import React,{Component} from "react";
import io from 'socket.io-client';
import queryString from 'query-string';

let socket;
const END_POINT="localhost:3000";

class ChatScreenComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            username:"",
            room:"",
        }

    }

    componentWillUnmount(){
        socket.emit('disconnect');
        socket.off();
    }

    componentDidMount(){
        const {name,room}=queryString.parse(this.props.location.search);
        console.log("Name:"+name);
        console.log("Room:"+room);

        socket=io(END_POINT);

        this.setState({
            username:name,
            room:room
        })

        socket.emit('join',{name,room});
    }


    render(){
        return (<>
        Welcome {this.state.username}</>)
    }
}

export default ChatScreenComponent;