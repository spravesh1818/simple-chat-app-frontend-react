import React from 'react';
import "./OnlineUsersComponent.css";

const OnlineUsersComponent = ({onlineusers}) => (
    <div className="online-user">
    <div className="online-header">
        <h2> Online</h2>
    </div>
    <div className="online-user-list">
        {onlineusers.map((user,i)=>{
            return <div key={i}><span className="onlineUserSymbol">*</span>{user.name}</div>
        })}
    </div>
    </div>
)



export default OnlineUsersComponent;