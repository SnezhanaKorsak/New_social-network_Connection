import React from 'react';
import s from './Messages.module.css'
import {UserItem} from "./UserItem/UserItem";
import {DialogItem} from "./DialogItem/DialogItem";
import {MessagePropsType} from './MessagesContainer';
import {Field, Form, Formik} from "formik";


export function Messages(props: MessagePropsType) {

    const addMessage = (newMessage: string) => {
        props.addMessage(newMessage)
    }


    let usersElement = props.messagePage.users.map(u => <UserItem key={u.id} id={u.id} name={u.name}/>);
    let dialogElement = props.messagePage.dialogs.map(d => <DialogItem key={d.id} message={d.message}/>);


    return (
        <div className={s.messages}>
            <div className={s.users}>
                {usersElement}
            </div>

            <div className={s.dialogs}>
                {dialogElement}
                <AddNewMessageForm addMessage={addMessage}/>
            </div>
        </div>
    )
}

type DataFormType = {
    newMessage: string
}
type AddNewMessageFormPropsType = {
    addMessage: (newMessage: string) => void
}

const AddNewMessageForm: React.FC<AddNewMessageFormPropsType> = ({addMessage}) => {

    const addMessageHandler = (values: DataFormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        addMessage(values.newMessage)
        setSubmitting(false)
    }

    return (
        <div className={s.addMessageForm}>
            <Formik
                initialValues={{newMessage: ''}}
                onSubmit={addMessageHandler}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field className={s.textarea} type="textarea" name="newMessage"
                               placeholder='Write something here...'
                               autocomplete="off"
                        />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}