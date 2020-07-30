import React from "react";



const HeaderComponent = ({ roomName ,exitRoom}) => (
    <div className="chat-screen-header">
        <div className="chat-room-name">
            <label className="chat-room-name-label">
                Room:{roomName}
            </label>
        </div>
        <div className="chat-room-exit">
            <button className="chat-room-exit-btn" onClick={exitRoom}>Exit Room</button>
        </div>
    </div>
)

export default HeaderComponent;

