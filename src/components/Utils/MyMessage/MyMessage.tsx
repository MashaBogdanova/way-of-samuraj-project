import React, {FC, useState} from "react"
import {HeartOutlined, LikeOutlined} from "@ant-design/icons"
import {Avatar, Comment, Tooltip} from "antd"
import style from "./MyMessage.module.css"
import {useLocation, useParams} from "react-router-dom";

type propsType = {
    text: string
    deleteText: (id: number) => void
    id: number
}

const Posts: FC<propsType> = ({text, deleteText, id}) => {

    const [likes, setLikes] = useState(0)
    const [hearts, setHearts] = useState(0)
    const dialog = useLocation().pathname

    const onTextDelete = () => {
        deleteText(id)
    }

    return (
        <div className={style.message}>
            <Comment
                author={dialog === "/dialogs/1" ? <a>Han Solo</a> : <a>efremos</a>}
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="User's avatar" />}
                content={<p>{text}</p>}
                datetime={
                    <Tooltip title="2016-11-22 11:22:33">
                        <span>8 hours ago</span>
                    </Tooltip>
                }
            />
            <div className={style.actions}>
                <div className={style.action}><LikeOutlined onClick={() => setLikes(value => value + 1)}/></div>
                <div>{likes}</div>
                <div className={style.action}><HeartOutlined onClick={() => setHearts(value => value + 1)}/></div>
                <div>{hearts}</div>
                <div className={style.action} onClick={onTextDelete}>Delete</div>
            </div>
        </div>
    )
}

export default Posts
