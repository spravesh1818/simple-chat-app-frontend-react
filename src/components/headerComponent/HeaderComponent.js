import React from "react";
import "./HeaderComponent.css";

const HeaderComponent = ({ roomName ,exitRoom}) => (
    <div className="headercomp-header">
        <div className="header-name">
            <label className="chat-room-name-label">
                Room:{roomName}
            </label>
        </div>
        <div className="chat-room-exit">
            <button className="header-exit-btn" onClick={exitRoom}>Exit Room</button>
        </div>
    </div>
)

export default HeaderComponent;

