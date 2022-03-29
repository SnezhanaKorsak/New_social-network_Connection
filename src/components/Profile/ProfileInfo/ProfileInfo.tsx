import React from 'react';
import s from "./ProfileInfo.module.css";
import {ProfileType} from "../../../redux/profileReducer";
import {Preloader} from "../../../common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
}

export const ProfileInfo: React.FC<PropsType> = ({
                                                     profile,
                                                     status,
                                                     updateStatus,
                                                 }) => {
    if (!profile) return <Preloader/>

    return <div className={s.info}>
        <ul className={s.infoHeader}>
            <li>Basic Information</li>
            <li>Websites and Social Links</li>
        </ul>
        <hr/>
        <div className={s.infoBlock}>
            <div className={`${s.basicItem} ${s.order}`}>
                Name:<br/>
                About me:<br/>
                Profession:<br/>
                Status:<br/>
            </div>
            <div className={s.basicItem}>
                {profile.fullName ? profile.fullName : 'no information'}<br/>
                {profile.aboutMe ? profile.aboutMe : 'no information'}<br/>
                {profile.lookingForAJob ? "I'm locking for a job"
                    : profile.lookingForAJobDescription ? profile.lookingForAJobDescription
                        : 'no information'}<br/>

                <ProfileStatus status={status} updateStatus={updateStatus}/>
            </div>

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
}