import React from 'react';

const ChatComposeComponent = ({message,setMessage,sendMessage}) => (
    <div className="chat-screen-message-compose">
        <form onSubmit={sendMessage}>
            <input className="chat-screen-input" type="text" value={message} onChange={setMessage}></input>
            <button type="submit" className="chat-screen-btn">Send</button>
        </form>
    </div>
);

export default ChatComposeComponent;

