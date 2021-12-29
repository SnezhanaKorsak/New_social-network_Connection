import React from "react";
import s from './Login.module.css'
import { Form, Formik} from "formik";
import {TextField} from "../Form/TextField";
import { SignUpSchema } from "../common/validation/validation";
import {connect} from "react-redux";
import { loginTC } from "../redux/authReducer";
import {AppStateType} from "../redux/redux-store";
import {PATH} from "../App";
import { Redirect } from "react-router-dom";



type MyFormValues = {
    email: string
    password: string
    isRememberMe: boolean
}

const LoginForm = ({loginTC}: {loginTC: (email: string, password: string, rememberMe: boolean) => void}) => {
    const initialValues: MyFormValues = {email: '', password: '', isRememberMe: false}

    const onSubmitHandler = (values: MyFormValues) => {
        loginTC(values.email, values.password, values.isRememberMe)
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
type LoginPropsType = {
    isAuth: boolean
    userId: string | null
    loginTC: (email: string, password: string, rememberMe: boolean) => void
}

 const Login: React.FC<LoginPropsType>  = ({isAuth, userId, loginTC}) => {

     if (isAuth) {
         return <Redirect to={PATH.PROFILE + userId}/>
     }

    return <div className={s.container}>
        <h1>Authorization</h1>
        <div>Please log in</div>

        <LoginForm loginTC={loginTC}/>
    </div>
}


type MapStatePropsType = {
    isAuth: boolean
    userId: string | null
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        userId: state.auth.userId,
    }
}

export default connect(mapStateToProps, {loginTC})(Login)

//2809fifka1103astra