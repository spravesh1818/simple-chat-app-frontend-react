import React from 'react';


const OnlineUsersComponent = ({onlineusers}) => (
    <>
    <div className="header">
        <h2> Online</h2>
    </div>
    <div className="chat-screen-online-user-list">
        {onlineusers.map((user)=>{
            return <div>{user.name}</div>
        })}
    </div>
    </>
)



export default OnlineUsersComponent;