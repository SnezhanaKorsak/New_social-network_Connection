import React from "react";
import s from './Login.module.css'
import { Form, Formik} from "formik";
import {TextField} from "../../Form/TextField";
import { SignUpSchema } from "../../common/validation/validation";
import {connect} from "react-redux";
import { loginTC } from "../../redux/authReducer";
import {AppStateType} from "../../redux/redux-store";
import {PATH} from "../../App";
import { Redirect } from "react-router-dom";



type MyFormValues = {
    email: string
    password: string
    isRememberMe: boolean
    captcha: string
}

type LoginFormPropsType = {
    captchaUrl: string | null
    loginTC: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
}

const LoginForm: React.FC<LoginFormPropsType> = ( {loginTC, captchaUrl}) => {
    const initialValues: MyFormValues = {email: '', password: '', isRememberMe: false, captcha: ""}

    const onSubmitHandler = (values: MyFormValues) => {
        loginTC(values.email, values.password, values.isRememberMe, values.captcha)
    }
    console.log(captchaUrl)
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

                        {captchaUrl &&
                        <TextField type='text' name='captcha' placeholder='Symbols from image'/>
                        }

                        <TextField type='checkbox' name='isRememberMe' placeholder='Password' label='Remember me'/>

                        {captchaUrl && <img src={captchaUrl} alt="captcha"/>}

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
    captchaUrl: string | null
    loginTC: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

 const Login: React.FC<LoginPropsType>  = ({isAuth, loginTC, captchaUrl}) => {

     if (isAuth) {
         return <Redirect to={PATH.PROFILE}/>
     }

    return <div className={s.container}>
        <h1>Authorization</h1>
        <div className={s.formLabel}>
            <p>To log in get registered
                <a href="https://social-network.samuraijs.com/"
                   target="_blank" rel="noreferrer">
                    here
                </a>
            </p>
            <p>or use common test account credentials:</p>
            <p><span>Email</span>: free@samuraijs.com</p>
            <p><span>Password</span>: free</p>
        </div>

        <LoginForm loginTC={loginTC} captchaUrl={captchaUrl}/>
    </div>
}


type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
   /* userId: string | null*/
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
       /* userId: state.auth.userId,*/
    }
}

export default connect(mapStateToProps, {loginTC})(Login)
