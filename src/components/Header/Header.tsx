import React from 'react';
import s from "./Header.module.css"

export function Header() {
 return <header className={s.header}>
     <img src={"https://cdn-icons-png.flaticon.com/512/1659/1659076.png"}/>
     <div className={s.logoText}>CONNECTION...</div>
 </header>

}