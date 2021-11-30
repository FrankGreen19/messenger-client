import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignIn from "./pages/SignIn";
import Chat from "./pages/Chat";
import Rooms from "./pages/Rooms";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route path="/chat" component={Chat} />
                <Route path="/rooms" component={Rooms} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;
