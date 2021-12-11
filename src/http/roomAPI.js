import {$host} from "./index";

export const fetchRooms = async (userId) => {
    const {data} = await $host.get(`/room-user/rooms/${userId}`);
    return data;
}

export const fetchRoomData = async (roomId) => {
    const {data} = await $host.get(`/room/${roomId}`);
    return data;
}