import axios from "axios";
import {FriendType} from "../redux/friendsReducer";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': 'c0caff3e-2af3-4ee5-bed5-c0d120d6cc75'
    }
})

export type ResponseApiType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export type GetUsersResponse = {
    items: FriendType[]
    totalCount: number
    error: string | null
}

export type AuthDataType = {
    id: string
    login: string
    email: string
}

export type PhotosDataType = {
    small: string;
    large: string
}