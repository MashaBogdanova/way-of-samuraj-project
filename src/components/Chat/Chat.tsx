import React, {FC, useEffect} from "react"
import commonStyles from "../../App.module.css"
import style from "./Chat.module.css"
import {ChatMessages} from "./ChatMessages/ChatMessages"
import {useSelector} from "react-redux"
import {getStatus} from "../../redux/selectors/chatSelectors"
import {useAppDispatch} from "../../hooks/redux"
import {sendChatMessage, startMessagesListening, stopMessagesListening} from "../../redux/actions/chatActions"
import {MyMessageForm} from "../Utils/MyMessageForm/MyMessageForm"

/* IMPLEMENTED WITH THE CUSTOM FORM */

const Chat: FC = () => {

    const status = useSelector(getStatus)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div className={`${style.chat} ${commonStyles.whiteBlock}`}>
        {status === "error" && <div>Some error occurred. Please refresh the page.</div>}
        <ChatMessages/>
        <MyMessageForm placeholder="Write a message..."
                       sendMessage={sendChatMessage}
                       disabled={status !== "ready"}
        />
    </div>
}

export default Chat
