import React from 'react';
import Room from "../components/Room";
import axios from "axios";

const Rooms = () => {

    let userId = 1;
    let rooms = axios.get(`/room-user/rooms/${userId}`);

    return (
        <div className="row">
            <div className="col-lg-4">
                {rooms.map(room =>
                    <Room key={room.id} room={room}/>
                )}
            </div>
            <div className="col-lg-8">

            </div>
        </div>
    );
};

export default Rooms;