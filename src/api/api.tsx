import axios from "axios";

type DataType = {
    id: number
    login: string
    email: string
}

type ApiResponseType = {
    data: DataType
    messages: []
    fieldsErrors: []
    resultCode: number
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': 'a00ef78b-3360-4cfb-a08a-5146df137c1f'
    }
})

export const UserAPI = {
    getUsers(currentPage = 1, pageLimit = 4) {
        return instance.get(`/users?page=${currentPage}&count=${pageLimit}`).then(response => response.data)
    },
    followUser(userId = 20572){
        return instance.post(`/follow/${userId}`, {}).then(response => response.data)
    },
    unfollowUser(userId = 20572){
        return instance.delete(`/follow/${userId}`).then(response => response.data)
    },
    getUsersProfile(userId: string) {
        return instance.get(`/profile/` + userId)
    },
}
export const AuthAPI = {
    me () {
        return instance.get<ApiResponseType>('/auth/me').then(response => response.data)
    }
}
