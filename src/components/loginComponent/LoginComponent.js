import React,{ Component } from 'react';
import SocketUtil from '../../helper/SocketUtil';
import {Link} from 'react-router-dom';

class LoginComponent extends Component{


    constructor(props){
        super(props);
        this.state={
            username:"",
            room:""
        }
        this.submitUsername=this.submitUsername.bind(this);
        this.submitRoom=this.submitRoom.bind(this);
    }

    submitUsername(event){
        console.log(event.target.value)
        this.setState({
            username:event.target.value
        })
    }

    submitRoom(event){
        console.log(event.target.value);
        this.setState({
            room:event.target.value
        })
    }


    render(){
        return <div>
                <input type="text" placeholder="Enter A Username" value={this.state.username} onChange={this.submitUsername}></input>
                <input type="text" placeholder="Enter A Room To Join" value={this.state.room} onChange={this.submitRoom}></input>
                <Link onClick={event=>(!this.state.username)?event.preventDefault():null} to={`/chat?name=${this.state.username}&room=${this.state.room}`}>
                    <button type="submit">Sign In</button>
                </Link>
                
        </div>
    }
}

export default LoginComponent;