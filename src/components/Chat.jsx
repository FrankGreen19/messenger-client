import React from 'react';
import socket from "../socket";

const Chat = ({users, messages, userName, roomId, onAddMessage}) => {
    const [messageValue, setMessageValue] = React.useState('');
    const messagesRef = React.useRef(null);

    function onSendMessage() {
        socket.emit('ROOM:NEW_MESSAGE', {
            roomId,
            text: messageValue,
            userName
        });
        onAddMessage({
            text: messageValue,
            userName
        });
        setMessageValue('');
    }

    return (
        <div className="card mt-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-lg-3">
                        <b>Online ({users.length})</b>
                        <ul>
                            {users.map((name) => (
                                <li key={name}>{name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-lg-9">
                        <div className="card">
                            <div className="card-body">
                                <div ref={messagesRef} className="messages">
                                    {
                                        messages.map((message) => (
                                            <div className="message  mt-2">
                                                <span className="bg-success text-light rounded p-2 w-auto">{message.text}</span>
                                                <div className="text-muted">
                                                    <span>{message.userName}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-9">
                                <textarea
                                    value={messageValue}
                                    onChange={(e) => setMessageValue(e.target.value)}
                                    className="form-control my-3" cols="15" rows="3"/>
                            </div>
                            <div className="col-lg-1 my-3">
                                <button onClick={onSendMessage} className="btn btn-primary">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;