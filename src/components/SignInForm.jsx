import React from "react";
import axios from "axios";

function  SignInForm({ onLogin }) {
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
            <div className="col-lg-12">
                <div className="card mx-auto my-auto w-25 mt-3">
                    <div className="card-body text-center">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Беседа"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Логин"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                        <button disabled={isLoading} className="btn btn-primary mt-3" onClick={onEnter}>
                            {isLoading ? "Вход..." : "Войти"}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SignInForm;