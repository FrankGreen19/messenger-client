import React from 'react';
import Room from "../components/Room";
import axios from "axios";
import Chat from "../components/Chat";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchRooms} from "../http/roomAPI";
import Image from "../components/Image";

const Rooms = observer(() => {
    const {rooms} = React.useContext(Context);
    const {userStore} = React.useContext(Context);

    const [roomId, setRoomId] = React.useState(null);
    const [roomData, setRoomData] = React.useState({});
    const [messages, setMessages] = React.useState([]);

    const socket = React.useRef();

    function connect() {
        socket.current = new WebSocket('ws://localhost:3001');

        socket.current.onopen = () => {
            const message = {
                event: 'connection',
                user: userStore._user,
                roomId: roomData.id,
            }
            socket.current.send(JSON.stringify(message));
            console.log('Connected')
        }

        socket.current.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            await axios.get(`/message/room/${roomId}`).then(messagesInfo => setMessages(messagesInfo.data));
        }

        socket.current.onclose = () => {}
        socket.current.onerror = () => {
            console.log('Socket closed');
        }
    }

    React.useEffect(() => {
        fetchRooms(userStore._user.id).then(roomsData => rooms.setRooms(roomsData));
    }, []);


    React.useEffect(() => {
        async function fetchData() {
            await axios.get(`/room/${roomId}`).then(roomInfo => setRoomData(roomInfo.data));
            await axios.get(`/message/room/${roomId}`).then(messagesInfo => setMessages(messagesInfo.data));
            console.log('roomData', roomData);
            connect();
        }

        fetchData();
    }, [roomId]);

    return (
        <div className="row mt-2">
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <h4>{userStore._user.firstName + " " + userStore._user.lastName}</h4>
                    </div>
                </div>
                {rooms.getRooms().map(room =>
                    <Room key={room.id} room={room} setRoomId={setRoomId}/>
                )}
            </div>
            <div className="col-lg-8">
                {Object.keys(roomData).length > 0
                    ? <Chat roomData={roomData} currentUser={userStore._user} messages={messages} socket={socket} />
                    : <Image />}
            </div>
        </div>
    );
});

export default Rooms;