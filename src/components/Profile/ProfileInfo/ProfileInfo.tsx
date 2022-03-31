import React from 'react';
import s from "./ProfileInfo.module.css";
import {ProfileType} from "../../../redux/profileReducer";
import {Preloader} from "../../../common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders} from "@fortawesome/free-solid-svg-icons/faSliders";

type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    goEditMode: () => void
    updateStatus: (status: string) => void
}

export const ProfileInfo: React.FC<PropsType> = ({
                                                     profile,
                                                     status,
                                                     isOwner,
                                                     goEditMode,
                                                     updateStatus,
                                                 }) => {
    if (!profile) return <Preloader/>

    return <div className={s.info}>
        <div className={s.infoHeader}>
            <ul>
                <li>Basic Information</li>
                <li>Work</li>
                <li className={s.socialLinks}>Websites and Social Links</li>
            </ul>

            {isOwner && <div className={`${s.editProfileBtn} ${s.edit}`}>
                <FontAwesomeIcon icon={faSliders} size="lg" onClick={goEditMode}/>
            </div>}
        </div>
        <hr/>
        <div className={s.infoBlock}>
            <div className={s.infoItem}>
                <div className={`${s.basicItem} ${s.order}`}>
                    Name:<br/>
                    About me:<br/>
                    Status:<br/>
                </div>
                <div className={s.basicItem}>
                    {profile.fullName ? profile.fullName : 'no information'}<br/>
                    {profile.aboutMe ? profile.aboutMe : 'no information'}<br/>

                    <ProfileStatus status={status} updateStatus={updateStatus}/>
                </div>
            </div>

            <div className={s.infoItem}>
                <div className={`${s.basicItem} ${s.order}`}>
                    Status:<br/>
                    Profession:<br/>
                </div>

                <div className={s.basicItem}>
                    {profile.lookingForAJob ? "I'm locking for a job" : 'I\'m working'}<br/>
                    {profile.lookingForAJob ? profile.lookingForAJobDescription : 'no information'}<br/>
                </div>
            </div>

            <div className={`${s.infoItem} ${s.socialLinks}`}>
                <div className={`${s.basicItem} ${s.order}`}>
                    Facebook:<br/>
                    VK:<br/>
                    Instagram:<br/>
                    GitHub:<br/>
                </div>
                <div className={s.basicItem}>
                    {profile.contacts.facebook ? profile.contacts.facebook : 'no information'}<br/>
                    {profile.contacts.vk ? profile.contacts.vk : 'no information'}<br/>
                    {profile.contacts.instagram ? profile.contacts.instagram : 'no information'}<br/>
                    {profile.contacts.github ? profile.contacts.github : 'no information'}<br/>
                </div>
            </div>
        </div>

    </div>
}