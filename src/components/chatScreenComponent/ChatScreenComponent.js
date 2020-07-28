import React,{Component} from "react";
import io from 'socket.io-client';
import queryString from 'query-string';

let socket;
const END_POINT="localhost:3000";

class ChatScreenComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            username:""
        }

    }

    componentWillUnmount(){
        socket.emit('disconnect');
    }

    componentDidMount(){
        const {name}=queryString.parse(this.props.location.search);

        socket=io(END_POINT);

        this.setState({
            username:name
        })

        socket.emit('join',{name:name});
    }


    render(){
        return (<>
        Welcome {this.state.username}</>)
    }
}

export default ChatScreenComponent;