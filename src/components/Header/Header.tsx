import React from 'react';
import {NavLink} from 'react-router-dom';
import s from "./Header.module.css"
import {PATH} from "../../App";

type PropsType = {
    isAuth: boolean
    login: string | null
    logoutTC: () => void
}

export const Header: React.FC<PropsType> = ({isAuth, login, logoutTC}) => {

    return <header className={s.header}>
        <img src={"https://cdn-icons-png.flaticon.com/512/1659/1659076.png"} alt='logo'/>
        <div className={s.logoText}>CONNECTION...</div>
        <div className={s.login}>
            {isAuth
                ? <div className={s.loginContainer}>
                    {login}
                    <button className={s.button} onClick={logoutTC}>Logout</button>
                </div>
                : <NavLink to={PATH.LOGIN}>LOGIN</NavLink>
            }
        </div>
    </header>

}