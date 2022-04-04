import {AuthDataType, instance, ResponseApiType} from "./api";

export const authAPI = {
    me() {
        return instance.get<ResponseApiType<AuthDataType>>('/auth/me')
            .then(response => response.data)
    },
    logIn(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<ResponseApiType<{ userId: number }>>('/auth/login',
            {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete<ResponseApiType>('/auth/login')
    }
}