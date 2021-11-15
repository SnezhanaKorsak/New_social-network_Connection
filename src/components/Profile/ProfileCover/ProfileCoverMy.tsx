import React from 'react';
import s from "./ProfileCover.module.css";

export function ProfileCover() {
    return <div className={s.cover}>
        <div className={s.avatar}>
            <img
                src={"https://sun1-83.userapi.com/s/v1/ig2/GTd8EAwDEzqcOlUQLoyckauXcHETC5dOMfQw_yPT0Xcc_mpfp5tD-GGnDG2DAG6pI4fi_7Ko5kdz_H2ofkuO7t5R.jpg?size=200x0&quality=96&crop=82,440,609,609&ava=1"}
                alt='cover'/>
        </div>
    </div>
}