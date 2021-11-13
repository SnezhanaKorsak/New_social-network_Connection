import React from "react";
import s from './Friends.module.css'
import {FriendType, initialStateType} from "../../redux/friendsReducer";
import coverUser1 from '../../assets/images/cover-for-user-block-1.jpg'
import coverUser2 from '../../assets/images/cover-for-user-block-2.jpg'
import coverUser3 from '../../assets/images/cover-for-user-block-3.jpg'
import coverUser4 from '../../assets/images/cover-for-user-block-4.jpg'
import notFindAva from '../../assets/images/unnamed.jpg'
import PaginationContainer from "./Pagination/PaginationContainer";
import {Preloader} from "../../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import {PATH} from "../../App";


type FriendsPropsType = {
    friendsPage: initialStateType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    isFetching: boolean
}
export const Friends: React.FC<FriendsPropsType> = ({friendsPage, follow, unfollow, isFetching}) => {

    const changeFollowHandler = (userId: number, followStatus: boolean) => {
        followStatus ? unfollow(userId) : follow(userId)
    }

    return (
        <>
            <div className={s.coverForBlock}>
                <img src='https://pbs.twimg.com/profile_banners/1330958413988302851/1611531284/1500x500' alt='cover'/>
                <div className={s.label}>Friend lists</div>
                <div className={s.pagination}>
                    <PaginationContainer/>
                </div>
            </div>

            {isFetching ? <Preloader/>
            :
                friendsPage.friends.map(f => {
                    let cover = coverUser1
                    if (f.id % 2 === 0) cover = coverUser2
                    if (f.id % 3 === 0) cover = coverUser3
                    if (f.id % 4 === 0) cover = coverUser4

                    return <span key={f.id}>
                <span className={s.container}>

                    <div className={s.blockItem}>

                        <img className={s.coverForItem} alt='cover'
                             src={cover}/>

                        <NavLink to={PATH.PROFILE + f.id}>
                            <img src={f.photos.small ? f.photos.small : notFindAva} className={s.avatar}
                                      alt='avatar'/>
                        </NavLink>

                        <button onClick={() => changeFollowHandler(f.id, f.followed)}>
                            {f.followed ? 'Follow' : 'Unfollow'}
                        </button>

                        <span className={s.info}>
                            <div className={s.name}>{f.name}</div>
                            <div>{"@developer"}</div>
                            <div className={s.status}>{f.status ? f.status : "I'm ok"}</div>
                        </span>

                    </div>

                </span>
            </span>
                })
            }



        </>
    )
}