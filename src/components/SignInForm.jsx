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
    const [error, setError] = React.useState('');
    const [buttonActive, setButtonActive] = React.useState(false);
    const [redUnderline, setRedUnderline] = React.useState({});

    React.useEffect(() => {
        validate() ? setButtonActive(true) : setButtonActive(false);
    }, [email, password])

    function validate() {
        setError('');
        // setRedUnderline('');

        if (email.length === 0 || password.length === 0) {
            setError('Поля не могут быть пустыми\n')
            setRedUnderline({textDecoration: "underline red"});
            return false;
        }

        if (email.length < 6 || password.length < 6) {
            setError(prevState => prevState + "Длина логина и пароля не может быть меньше 6 символов\n")
            setRedUnderline({textDecoration: "underline red"});
            return false;
        }

        if (!validateEmail(email)) {
            setError(prevState => prevState + "Email не похож на настоящий\n")
            setRedUnderline({textDecoration: "underline red"});
            return false;
        }

        return true;
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async function signIn() {
        if (!validate()) {return false}

        try {
            console.log(email, " ", password);

            let user = await login(email, password);
            userStore.setUser(user);
            userStore.setIsAuth(true);

            history.push('/rooms');
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
                            // style={redUnderline}
                        />
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            // style={redUnderline}
                        />
                        <button className="btn btn-primary mt-4" onClick={signIn} disabled={!buttonActive}>
                            Войти
                        </button>
                        <div className="card mt-1">
                            <div className="card-body">
                                {error}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
})

export default SignInForm;