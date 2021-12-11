import React from 'react';

const Room = ({room, setRoomId}) => {
    return (
        <div className="card mt-1">
            <div className="card-body">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card-title">
                            <p>{room.title}</p>
                        </div>
                        <hr/>
                        <div className="card-text text-muted">
                            {
                                room.messages[room.messages.length - 1]
                                    ? `${room.messages[room.messages.length - 1].user.firstName}:  ${room.messages[room.messages.length - 1].body}`
                                    : ''
                            }
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <p className="text-muted">
                            {
                                room.messages[room.messages.length - 1]
                                    ? (new Date(room.messages[room.messages.length - 1].createdAt).toISOString().split('T')[0])
                                    : ''
                            }
                        </p>
                        <hr/>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => setRoomId(room.id)}>Загрузить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;