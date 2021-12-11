import React, {useRef} from 'react';
import Message from "./Message";

const Chat = ({roomData, currentUser, messages, socket}) => {
    const [messageValue, setMessageValue] = React.useState('');

    const sendMessage = async () => {
        const message = {
            user: currentUser,
            body: messageValue,
            roomId: roomData.id,
            event: 'message'
        }
        socket.current.send(JSON.stringify(message));
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                        <div className="col-lg-3">
                            <b>Участники ({roomData.users.length})</b>
                            <ul>
                                {roomData.users.map((user) => (
                                    <li key={user.id}>{`${user.firstName} ${user.lastName}`}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-lg-9">
                            <div className="card">
                                <div className="card-body">
                                    <div className="messages">
                                        {
                                            messages.map((message) => (
                                                <Message key={message.id} message={message} currentUser={currentUser} user={message.user}/>
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
                                    <button className="btn btn-primary" onClick={sendMessage}>Отправить</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default Chat;