import React from "react";
import s from './Login.module.css'
import {ErrorMessage, Field, Form, Formik} from "formik";

type DataFormType = {
    login: string
    password: string
    isRememberMe: boolean
}

const LoginForm = () => {
    const onSubmitHandler = (values: DataFormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    }


    return (

        <div className={s.form}>
            <Formik
                initialValues={{login: '', password: '', isRememberMe: false}}
                onSubmit={onSubmitHandler}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field className={s.item} type="text" name="login" placeholder='Login'/>
                        <ErrorMessage name="login" component="div"/>
                        <Field className={s.item} type="password" name="password" placeholder='Password'/>
                        <ErrorMessage name="password" component="div"/>
                        <Field type='checkbox' name={'isRememberMe'} component={'input'}/>
                        Remember me
                        <button className={s.item} type="submit" disabled={isSubmitting}>
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