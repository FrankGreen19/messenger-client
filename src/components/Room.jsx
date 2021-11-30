import React from 'react';

const Room = ({room}) => {
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
                            Lorem ipsum dolor sit amet, consectetur adipisicing.
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <p className="text-muted">29/11/2021</p>
                        <hr/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Room;