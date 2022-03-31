import React, {useState} from 'react';
import s from "./Profile.module.css"
import {ProfileCover} from "./ProfileCover/ProfileCover";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePostContainer} from "./ProfilePosts/NewPost/ProfilePostContainer";
import {ProfileType} from "../../redux/profileReducer";
import {ProfileFormValues, ProfileInfoForm} from "./ProfileInfo/ProfileInfoForm";


type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    updateProfile: (profile: ProfileType) => void
}

export const Profile: React.FC<ProfilePropsType> = ({
                                                        profile,
                                                        status,
                                                        isOwner,
                                                        updateStatus,
                                                        savePhoto,
                                                        updateProfile,
                                                    }) => {

    const [edit, setEdit] = useState(false)

    const goEditMode = () => {
        setEdit(true)
    }
    const onSubmitHandler = async (values: ProfileFormValues) => {
        if (profile) {
            await updateProfile({...profile, ...values, contacts: {...profile.contacts, ...values.contacts}})

            setEdit(false)
        }
    }

    return <div className={s.content}>
        <ProfileCover userAvatar={profile?.photos.small}
                      userId={profile?.userId}
                      isOwner={isOwner}
                      savePhoto={savePhoto}/>
        {edit
            ? <ProfileInfoForm profile={profile} onSubmitHandler={onSubmitHandler}/>
            : <ProfileInfo profile={profile}
                           status={status}
                           isOwner={isOwner}
                           goEditMode={goEditMode}
                           updateStatus={updateStatus}/>
        }

        <ProfilePostContainer/>
    </div>

}