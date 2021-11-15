import socket from './socket';
import React from "react";
import SignInForm from './components/SignInForm';
import reducer from "./reducer";
import Chat from "./components/Chat";
import axios from "axios";

function App() {
    const [state, dispatch] = React.useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    });

    async function onLogin(obj) {
        dispatch({
            type: 'JOINED',
            payload: obj,
        });

        socket.emit('ROOM:JOIN', obj);
        const { data } = await axios.get(`/rooms/${obj.roomId}`);
        dispatch({
            type: 'SET_DATA',
            payload: data,
        });
    }

    function setUsers(users) {
        dispatch({
            type: 'SET_USERS',
            payload: users
        });
    }

    function addMessage(message) {
        dispatch({
            type: 'NEW_MESSAGE',
            payload: message
        });
    }

    React.useEffect(() => {
        socket.on('ROOM:JOINED', setUsers);
        socket.on('ROOM:SET_USERS', setUsers);
        socket.on('ROOM:NEW_MESSAGE', addMessage);
    }, []);

    window.socket = socket;

    return (
        <div className="App">
            {state.joined ?
                <Chat {...state} onAddMessage={addMessage}/> : <SignInForm onLogin={onLogin} />}
        </div>
    );
}

export default App;
