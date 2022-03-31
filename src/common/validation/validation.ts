import * as Yup from 'yup';

export const SignUpSchema = Yup.object({
    email: Yup.string()
        .email('Email is invalid')
        .required(),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required(),
})

export const UpdateProfileSchema = Yup.object({
    fullName: Yup.string()
        .required(),
    aboutMe: Yup.string()
        .required(),
    lookingForAJob: Yup.boolean()
        .required(),
    lookingForAJobDescription: Yup.string()
        .required(),
    contacts: Yup.object({
        facebook: Yup.string()
            .url("URL is incorrect"),
        vk: Yup.string()
            .url("URL is incorrect"),
        instagram: Yup.string()
            .url("URL is incorrect"),
        github: Yup.string()
            .url("URL is incorrect"),
    })
})