import React, {ChangeEvent} from 'react';
import {addMessageAC, onMessageChangeAC} from '../../redux/messageReducer';
import {Messages} from "./Messages";
import {StoreContext} from "../../StoreContext";


type MessagesContainerPropsType = {
  /*  store: StoreType*/
}

export function MessagesContainer(props: MessagesContainerPropsType) {


    return (
        <StoreContext.Consumer>
            {(store) => {

                const state = store.getState()

                const addMessage = (messageText: string) => {
                    store.dispatch(addMessageAC(messageText))
                    store.dispatch(onMessageChangeAC(''))
                }
                const updateMessageText = (newText: string) => {
                    store.dispatch(onMessageChangeAC(newText))
                }

                return <Messages messagePage={state.messagePage}
                                 addMessage={addMessage}
                                 updateMessageText={updateMessageText}
                />
            }}
        </StoreContext.Consumer>

    )
}