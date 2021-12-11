import {makeAutoObservable} from "mobx";

export default class RoomsStore {
    constructor() {
        this._rooms = [];

        makeAutoObservable(this);
    }

    get rooms() {
        return this._rooms;
    }

    set rooms(value) {
        this._rooms = value;
    }

    setRooms(rooms) {
        this._rooms = rooms;
    }

    getRooms() {
        return this._rooms;
    }

}