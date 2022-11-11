import React, {FC} from "react"
import style from "./ProfileInfo.module.css"
import Preloader from "../../Utils/Preloader/Preloader"
import {ProfileDataForm} from "../ProfileDataForm/ProfileDataForm"
import {useAppDispatch, useAppSelector} from "../../../hooks/redux"
import {UserAvatar} from "./UserAvatar/UserAvatar"
import {ProfileData} from "./ProfileData/ProfileData"
import {Status} from "./Status/Status";
import {profileSlice} from "../../../redux/reducers/profileSlice"

const ProfileInfo: FC<{ isOwner: boolean }> = ({isOwner}) => {

    const {profile, isEditMode} = useAppSelector(state => state.profilePage)
    const dispatch = useAppDispatch()
    const setEditMode = (isEditMode: boolean) => dispatch(profileSlice.actions.setEditMode(isEditMode))
    const activateEditMode = () => setEditMode(true)

    if (!profile) {
        return <Preloader/>
    }

    return <div className={style.profileInfo}>

        <div className={style.avatar}><UserAvatar isOwner={isOwner}/></div>

        <h1>{profile?.fullName}</h1>

        {isOwner && <div onClick={activateEditMode} className={style.edit}>Edit</div>}

        <Status className={style.status}/>

        {isEditMode
            ? <div className={style.modal}>
                <div className={style.modalWindow}>
                    <ProfileDataForm/>
                </div>
            </div>
            : <ProfileData isOwner={isOwner} className={style.profileData}/>
        }
    </div>

}

export default ProfileInfo