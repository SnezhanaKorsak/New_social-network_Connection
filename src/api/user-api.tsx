import {GetUsersResponse, instance, ResponseApiType} from "./api";

export const userAPI = {
    getUsers(currentPage = 1, pageLimit = 4) {
        return instance.get<GetUsersResponse>(`/users?page=${currentPage}&count=${pageLimit}`)
            .then(response => response.data)
    },
    followUser(userId = 20572) {
        return instance.post<ResponseApiType>(`/follow/${userId}`, {})
            .then(response => response.data)
    },
    unfollowUser(userId = 20572) {
        return instance.delete<ResponseApiType>(`/follow/${userId}`)
            .then(response => response.data)
    },
}