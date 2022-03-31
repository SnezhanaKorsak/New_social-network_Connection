import React from 'react';
import s from "./ProfileInfo.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-regular-svg-icons/faSave";
import {Form, Formik} from "formik";
import {TextField} from "../../../Form/TextField";
import {UpdateProfileSchema} from "../../../common/validation/validation";
import {ProfileType} from "../../../redux/profileReducer";


export type ProfileFormValues = {
    fullName: string;
    aboutMe: string;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    contacts: {
        facebook: string;
        vk: string;
        instagram: string;
        github: string;
    }

}

type ProfileInfoFormPropsType = {
    profile: ProfileType | null;
    onSubmitHandler: (values: ProfileFormValues) => void
}

export const ProfileInfoForm: React.FC<ProfileInfoFormPropsType> = ({profile, onSubmitHandler}) => {

    if(!profile) {
        return null
    }

    const initialValues: ProfileFormValues = {
        fullName: profile.fullName,
        aboutMe: profile.aboutMe,
        lookingForAJob: profile.lookingForAJob,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        contacts: {
            facebook: profile.contacts.facebook,
            vk: profile.contacts.vk,
            instagram: profile.contacts.instagram,
            github: profile.contacts.github,
        }

    }

    return <Formik initialValues={initialValues}
                   validationSchema={UpdateProfileSchema}
                   onSubmit={(values: ProfileFormValues) => onSubmitHandler(values)}>
        {({ isValidating }) => (
            <Form>
                <div className={s.info}>
                    <div className={s.infoHeader}>
                        <ul>
                            <li>Basic Information</li>
                            <li>Work</li>
                            <li>Websites and Social Links</li>
                        </ul>

                        {<div className={`${s.editProfileBtn} ${s.save}`}>
                            <button  type="submit" disabled={isValidating}>
                                <FontAwesomeIcon icon={faSave} size="2x"/>
                            </button>

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
                                <TextField type='text' name='fullName' placeholder='Write something'/>
                                <TextField type='textarea' name='aboutMe' placeholder='Write something'/>
                            </div>
                        </div>

                        <div className={s.infoItem}>
                            <div className={`${s.basicItem} ${s.order}`}>
                                Status:<br/>
                                Profession:<br/>
                            </div>

                            <div className={`${s.basicItem}`}>
                                <div className={`${s.checkbox}`}>
                                    <TextField type='checkbox' name='lookingForAJob' />
                                    Are you looking for a job?
                                </div>
                                <TextField type='textarea' name='lookingForAJobDescription' placeholder='Write something'/>
                            </div>
                        </div>

                        <div className={s.infoItem}>
                            <div className={`${s.basicItem} ${s.order}`}>
                                Facebook:<br/>
                                VK:<br/>
                                Instagram:<br/>
                                GitHub:<br/>
                            </div>
                            <div className={s.basicItem}>
                                <TextField type='text' name='contacts.facebook' />
                                <TextField type='text' name='contacts.vk' />
                                <TextField type='text' name='contacts.instagram' />
                                <TextField type='text' name='contacts.github' />
                            </div>
                        </div>
                    </div>

                </div>
            </Form>
        )}

    </Formik>
}