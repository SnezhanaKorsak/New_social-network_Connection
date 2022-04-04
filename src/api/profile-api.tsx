import {ProfileType} from "../redux/profileReducer";
import {instance, PhotosDataType, ResponseApiType} from "./api";

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
        return instance.put<ResponseApiType<{ photos: PhotosDataType }>>(`/profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    updateProfile(profile: ProfileType) {
        return instance.put<ResponseApiType>(`/profile`, profile)
    }
}