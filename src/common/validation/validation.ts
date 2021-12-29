import * as Yup from 'yup';

export const SignUpSchema = Yup.object({
    email: Yup.string()
        .email('Email is invalid')
        .required(),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required(),
})