import React, {FC, useEffect} from "react"
import style from "./Profile.module.css"
import commonStyles from "./../../App.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import {profileSlice} from "../../redux/reducers/profileSlice"
import {useSelector} from "react-redux"
import {getPosts, getUserId} from "../../redux/selectors/profileSelectors"
import {useParams} from "react-router-dom"
import MyMessage from "../Utils/MyMessage/MyMessage"
import {MyMessageForm} from "../Utils/MyMessageForm/MyMessageForm"
import {useAppDispatch} from "../../hooks/redux"
import {PostType} from "../../types/types"
import {getStatusThunk, getProfileThunk} from "../../redux/actions/profileActions"

/* IMPLEMENTED WITH THE CUSTOM FORM */

const Profile: FC = () => {
    const posts = useSelector(getPosts)
    const userId = useSelector(getUserId)
    const dispatch = useAppDispatch()

    const deletePost = (postId: number) => dispatch(profileSlice.actions.deletePost(postId))
    const getProfile = (userId: null | number) => dispatch(getProfileThunk(userId))
    const getStatus = (userId: null | number) => dispatch(getStatusThunk(userId))

    const params = useParams()
    const isOwner = !params.userId

    const refreshProfile = () => {
        let id
        if (!params.userId) {
            id = userId as number | null
        } else {
            id = Number(params.userId)
        }
        getProfile(id)
        getStatus(id)
    }

    useEffect(() => {
        refreshProfile()
    }, [params.userId])


    return <div className={style.profile}>
                <div className={commonStyles.whiteBlock}>
                    <ProfileInfo isOwner={isOwner}/>
                </div>

                <div className={commonStyles.whiteBlock}>
                    <MyMessageForm placeholder="Write something..." sendMessage={profileSlice.actions.addPost}/>
                </div>

                <div className={`${commonStyles.whiteBlock} ${style.posts}`}>{
                    posts.map((p: PostType) => <MyMessage key={p.id} id={p.id} text={p.post} deleteText={deletePost}/>)
                }</div>
            </div>
}

export default Profile
