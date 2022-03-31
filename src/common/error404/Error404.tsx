import React from 'react'
import s from './Error404.module.css'
import {PATH} from "../../App";
import {NavLink} from "react-router-dom";


function Error404() {


    return (
        <div className={s.error}>
            <div className={s.errorType}>404</div>
            <div className={s.errorMessage}>Запрошенный материал не найден. <br/>
                Если вы считаете, что произошла ошибка,<br/>
                сообщите, пожалуйста, на почту<br/>
                <a>web@kudatuda.com</a>

                <div className={s.backLink}>
                    <NavLink to={PATH.PROFILE}>Back</NavLink>
                </div>

            </div>
            <div className={s.errorImage}>
                <img src={'https://m.seonews.ru/images/404.jpg'}
                     alt={'error'}
                />
            </div>
        </div>
    )
}

export default Error404
