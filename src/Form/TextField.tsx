import React from "react";
import {ErrorMessage, useField} from "formik";
import s from './TextField.module.css'


type TextFieldType = {
    type: string
    name: string
    placeholder?: string
    label?: string
}

export const TextField: React.FC<TextFieldType> = ({label, ...props}) => {
    const [field] = useField(props)

    return (
        <>
            <div className={s.item}>
                <input {...field} {...props}/>
                {label}
            </div>
            <div className={s.errorMessage}>
                <ErrorMessage  name={field.name}/>
            </div>
        </>
    )
}