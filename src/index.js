import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import RoomsStore from "./store/RoomsStore";

export const Context = React.createContext(null);


console.log('URL',process.env.REACT_APP_API_URL)

ReactDOM.render(
    <Context.Provider value={{
        userStore: new UserStore(),
        rooms: new RoomsStore(),
    }}>
        <App />,
    </Context.Provider>,
  document.getElementById('root')
);

