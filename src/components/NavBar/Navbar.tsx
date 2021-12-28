import React from 'react';
import s from "./Navbar.module.css"
import {NavLink} from "react-router-dom";
import {PATH} from "../../App";

type PropsType = {
    userId: number | null
}

export function Navbar(props: PropsType) {
 return <nav className={s.nav}>

     <div className={s.item}>
         <NavLink to={PATH.PROFILE + props.userId} activeClassName={s.active}>Profile</NavLink>
     </div>
     <div className={s.item}>
         <NavLink to={PATH.MESSAGES} activeClassName={s.active}>Messages</NavLink>
     </div>
     <div className={s.item}>
         <NavLink to={PATH.FRIENDS} activeClassName={s.active}>Friends</NavLink>
     </div>
     <div className={s.item}>
         <NavLink to={PATH.MUSIC} activeClassName={s.active}>Music</NavLink>
     </div>
     <div className={s.item}>
         <NavLink to={PATH.VIDEO} activeClassName={s.active}>Video</NavLink>
     </div>
     <div className={s.item}>
         <NavLink to='/image' activeClassName={s.active}>Image</NavLink>
     </div>
     <div className={s.item}>
         <NavLink to='/events' activeClassName={s.active}>Events</NavLink>
     </div>
     <div className={s.item}>
         <NavLink to='/settings' activeClassName={s.active}>Settings</NavLink>
     </div>

     <div className={s.item}>
         <NavLink to={PATH.LOGIN} activeClassName={s.active}>Login</NavLink>
     </div>
 </nav>

}