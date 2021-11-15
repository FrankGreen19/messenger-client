import React from "react";
import axios from "axios";

function SignInForm({ onLogin }) {
    const [roomId, setRoomId] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);

    async function onEnter() {
        console.log(roomId, " ", userName);

        const data = {
            roomId,
            userName
        };

        setLoading(true);

        await axios.post('/', data);
        onLogin(data);
    }

    return (
        <div className="row">
            <div className="col-lg-6 mx-auto p-2">
                <div className="card">
                    <div className="card-body">
                        {/*<form className="" action="">*/}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="roomId"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                        <button disabled={isLoading} className="btn btn-primary mt-1" onClick={onEnter}>
                            {isLoading ? "Entering..." : "Sign In"}
                        </button>
                        {/*</form>*/}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SignInForm;