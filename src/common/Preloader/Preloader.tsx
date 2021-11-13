import React from "react";
import s from './Preloader.module.css'
import loadingGif from "../../assets/images/ball-triangle.svg";

export const Preloader = () => {
    return <div>
        <img className={s.loading} src={loadingGif} alt='loading'/>
    </div>
}