import React from 'react';
import s from './DialogItem.module.css'

type DialogItemPropsType = {
    message: string
}

export function DialogItem(props: DialogItemPropsType) {
    return ( <div>
            <div className={s.dialogItem}>
                {props.message}
            </div>
        </div>
    )
}