import React, {ChangeEvent, FC, useRef} from 'react'
import {Badge, Button} from "antd"
import largeAvatar from "../../../../uploads/images/userAvatar.jpeg"
import {CameraOutlined} from "@ant-design/icons"
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux"
import style from "./UserAvatar.module.css"
import {saveAvatarThunk} from "../../../../redux/actions/profileActions"

type PropsType = {
    isOwner: boolean
}

export const UserAvatar: FC<PropsType> = ({isOwner}) => {

    const profile = useAppSelector(state => state.profilePage.profile)
    const inputRef = useRef(null)
    const dispatch = useAppDispatch()

    const handleSelect = () => {
        // @ts-ignore
        inputRef?.current?.click()
    }

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files?.length && savePhoto(e.target.files[0])
    }

    const savePhoto = (image: File) => {
        dispatch(saveAvatarThunk(image))
    }

    return <div className={style.avatar}>

        <Badge.Ribbon text={profile?.lookingForAJob ? "Open to work" : "Do not open to work"}
                      className={style.badge}
                      color={profile?.lookingForAJob ? "green" : undefined}
        >
            <img src={profile?.photos.large || largeAvatar} alt="User's avatar"/>
        </Badge.Ribbon>

        {isOwner &&
            <div className={style.input}>
                <input
                    ref={inputRef}
                    type="file"
                    onChange={onPhotoSelected}
                    hidden
                />
                <Button className={style.avatarButton}
                        shape="circle"
                        onClick={handleSelect}
                        icon={<CameraOutlined/>}/>
            </div>
        }

    </div>
}