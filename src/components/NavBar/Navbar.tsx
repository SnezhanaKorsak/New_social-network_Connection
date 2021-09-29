import React from 'react';
import s from "./Navbar.module.css"

export function Navbar() {
 return <nav className={s.nav}>
     <div className={`${s.item} ${s.active}`}>Profile</div>
     <div className={s.item}>Newsfeed</div>
     <div className={s.item}>Music</div>
     <div className={s.item}>Video</div>
     <div className={s.item}>Image</div>
     <div className={s.item}>Events</div>
     <div className={s.item}>Settings</div>
 </nav>

}