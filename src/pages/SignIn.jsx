import React from 'react';
import SignInForm from "../components/SignInForm";

const SignIn = () => {


    //
    // function addMessage(message) {
    //     dispatch({
    //         type: 'NEW_MESSAGE',
    //         payload: message
    //     });
    // }

    return (
        <div className="SignIn">
            {/*<SignInForm onLogin={onLogin} />*/}
            {/*{state.joined ?*/}
            {/*    <Chat {...state} onAddMessage={addMessage}/> : <SignInForm onLogin={onLogin} />}*/}

            <SignInForm/>

        </div>
    );
}

export default SignIn;