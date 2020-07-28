import React,{ Component } from 'react';
import SocketUtil from '../../helper/SocketUtil';
import {Link} from 'react-router-dom';

class LoginComponent extends Component{


    constructor(props){
        super(props);
        this.state={
            username:"",
        }
        this.submitUsername=this.submitUsername.bind(this);
    }

    submitUsername(event){
        console.log(event.target.value)
        this.setState({
            username:event.target.value
        })
    }


    render(){
        return <div>
                <input type="text" placeholder="Enter A Username" value={this.state.username} onChange={this.submitUsername}></input>
                
                <Link onClick={event=>(!this.state.username)?event.preventDefault():null} to={`/chat?name=${this.state.username}`}>
                    <button type="submit">Sign In</button>
                </Link>
                
        </div>
    }
}

export default LoginComponent;