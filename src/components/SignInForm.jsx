import React from "react";
import {login} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { useHistory } from "react-router-dom";

const SignInForm = observer(() => {
    const {userStore} = React.useContext(Context);
    const history = useHistory();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function signIn() {
        try {
            console.log(email, " ", password);

            let user = await login(email, password);
            userStore.setUser(user);
            userStore.setIsAuth(true);

            history.push('/rooms');

            // const data = {
            //     roomId,
            //     userName
            // };
            //
            // setLoading(true);
            //
            // await axios.post('/', data);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message)
            } else {
                alert(error);
            }
        }
    }

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="card mx-auto my-auto w-25 mt-3">
                    <div className="card-body text-center">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="btn btn-primary mt-3" onClick={signIn}>
                            {"Войти"}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
})

export default SignInForm;