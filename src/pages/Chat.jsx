import React from 'react';
import socket from "../socket";
import Message from "../components/Message";

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
        <div className="row">
            <div className="card mt-3 mx-auto w-75">
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
                                                <Message message={message} userName={userName}/>
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
                                    <button onClick={onSendMessage} className="btn btn-primary">Отправить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;