import React from "react";
import s from './Login.module.css'
import { Form, Formik} from "formik";
import {TextField} from "../Form/TextField";
import { SignUpSchema } from "../common/validation/validation";



type MyFormValues = {
    email: string
    password: string
    isRememberMe: boolean
}

const LoginForm = () => {
    const initialValues: MyFormValues = {email: '', password: '', isRememberMe: false}

    const onSubmitHandler = (values: MyFormValues, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 0);
    }

    return (

        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={SignUpSchema}
                onSubmit={onSubmitHandler}
            >
                {({ isValidating }) => (
                    <Form className={s.form}>
                        <TextField type='text' name='email' placeholder='Email'/>
                        <TextField type='password' name='password' placeholder='Password'/>
                        <TextField type='checkbox' name='isRememberMe' placeholder='Password' label='Remember me'/>
                        <button className={s.button} type="submit" disabled={isValidating}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export const Login = () => {
    return <div className={s.container}>
        <h1>Authorization</h1>
        <div>Please log in</div>

        <LoginForm/>
    </div>
}