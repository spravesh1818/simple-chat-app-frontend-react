import socketIOClient from "socket.io-client";
const END_POINT="http://127.0.0.1:3000";

class SocketUtil{
    constructor(){
        if(!!SocketUtil.instance){
            return SocketUtil.instance;
        }
        SocketUtil.instance=this;
        this.socket=socketIOClient(END_POINT);
        return this;
    }

    getSocket(){
        return this.socket;
    }

}

export default SocketUtil;