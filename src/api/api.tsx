import axios from "axios";
import {FriendType} from "../redux/friendsReducer";
import {ProfileType} from "../redux/profileReducer";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': 'c0caff3e-2af3-4ee5-bed5-c0d120d6cc75'
    }
})

export const userAPI = {
    getUsers(currentPage = 1, pageLimit = 4) {
        return instance.get<GetUsersResponse>(`/users?page=${currentPage}&count=${pageLimit}`).then(response => response.data)
    },
    followUser(userId = 20572) {
        return instance.post<ResponseApiType>(`/follow/${userId}`, {}).then(response => response.data)
    },
    unfollowUser(userId = 20572) {
        return instance.delete<ResponseApiType>(`/follow/${userId}`).then(response => response.data)
    },
}
export const authAPI = {
    me() {
        return instance.get<ApiResponseType>('/auth/me').then(response => response.data)
    },
    logIn(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<ResponseApiType<{ userId: number }>>('/auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete<ResponseApiType>('/auth/login')
    }
}

export const profileAPI = {
    getUsersProfile(userId: number) {
        return instance.get<ProfileType>(`/profile/` + userId)
    },
    getUserStatus(userId: string) {
        return instance.get<string>(`/profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put<ResponseApiType>(`/profile/status/`, {status})
    },
    savePhoto(file: string) {
        const formData = new FormData();
        formData.append("image", file)
        return instance.put<ResponseApiType<{photos: PhotosDataType}>>(`/profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateProfile(profile: ProfileType) {
        return instance.put<ResponseApiType>(`/profile`, profile)
    }
}

//types

export type ResponseApiType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

type GetUsersResponse = {
    items: FriendType[]
    totalCount: number
    error: string | null
}

type DataType = {
    id: string
    login: string
    email: string
}

type ApiResponseType = {
    data: DataType
    messages: []
    fieldsErrors: []
    resultCode: number
}

type PhotosDataType = {
    small: string;
    large: string
}