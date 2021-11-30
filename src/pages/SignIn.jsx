import React from 'react';
import reducer from "../reducer";
import socket from "../socket";
import axios from "axios";
import SignInForm from "../components/SignInForm";
import {BrowserRouter, Navigate, Redirect, Route, Routes} from 'react-router-dom';
import Chat from "../components/Chat";
import Rooms from "./Rooms";

const SignIn = () => {
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

        // socket.emit('ROOM:JOIN', obj);
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
        <div className="SignIn">
            {/*<SignInForm onLogin={onLogin} />*/}
            {/*{state.joined ?*/}
            {/*    <Chat {...state} onAddMessage={addMessage}/> : <SignInForm onLogin={onLogin} />}*/}

            {state.joined
                ? <BrowserRouter>
                    <Redirect to={'/rooms'}/>
                    <Route path="/rooms" component={Rooms}/>
                  </BrowserRouter>
                : <SignInForm onLogin={onLogin} />
            }
        </div>
    );
}

export default SignIn;