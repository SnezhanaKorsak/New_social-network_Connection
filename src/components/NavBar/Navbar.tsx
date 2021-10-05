import React from 'react';
import s from "./Navbar.module.css"
import {NavLink} from "react-router-dom";

export function Navbar() {
 return <nav className={s.nav}>
     <div className={`${s.item} ${s.active}`}><NavLink to='/profile' activeClassName={s.active}>Profile</NavLink></div>
     <div className={s.item}><NavLink to='/messages'>Messages</NavLink></div>
     <div className={s.item}><NavLink to='/music'>Music</NavLink></div>
     <div className={s.item}><NavLink to='/video'>Video</NavLink></div>
     <div className={s.item}><NavLink to='/image'>Image</NavLink></div>
     <div className={s.item}><NavLink to='/events'>Events</NavLink></div>
     <div className={s.item}><NavLink to='/settings'>Settings</NavLink></div>
 </nav>

}