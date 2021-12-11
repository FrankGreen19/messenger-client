import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};

        makeAutoObservable(this);
    }

    setUser(user) {
        this._user = user;
    }

    setIsAuth(state) {
        this._isAuth = state;
    }

    getIsAuth() {
        return this._isAuth;
    }

    get isAuth() {
        return this._isAuth;
    }

    set isAuth(value) {
        this._isAuth = value;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }
}