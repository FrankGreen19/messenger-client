import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignIn from "./pages/SignIn";
import Rooms from "./pages/Rooms";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";

const App = observer(() => {
    const {userStore} = React.useContext(Context);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        check().then(data => {
            userStore.setUser(true);
            userStore.setIsAuth(true);
        }).finally();
    }, [])

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route path="/rooms" component={Rooms} />
            </Switch>
        </BrowserRouter>
    )
})

export default App;
