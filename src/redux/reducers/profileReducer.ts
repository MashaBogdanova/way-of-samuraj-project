import {resultCodeEnum} from "../../api/api"
import {PhotosType, PostsType, ProfileType} from "../../types/types"
import {baseActionType, baseThunkType} from "../store"
import {profileAPI} from "../../api/profileAPI"
// import {createSlice} from "@reduxjs/toolkit"

type initialStateType = {
    posts: Array<PostsType>
    profile: ProfileType | null
    isEditMode: boolean
    status: string
}
// type initialStateType = typeof initialState
type actionsType = baseActionType<typeof actions>
type thunkType = baseThunkType<actionsType>


// const profileSlice = createSlice({
//     name: "profile",
//     initialState: {
//         posts: [
//             {id: 1, post: "Are you going to play fortnite?"},
//             {id: 2, post: "Hi there!"}
//         ],
//         profile: null,
//         isEditMode: false,
//         status: ""
//     } as initialStateType,
//     reducers: {
//         addPost(state, action){
//             state.posts.push(action.payload.newPost)
//         },
//         setEditMode(state, action){
//             state.isEditMode = action.payload.isEditMode
//         }
//     }
// })



let initialState = {
    posts: [
        {id: 1, post: "Are you going to play fortnite?"},
        {id: 2, post: "Hi there!"}
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    isEditMode: false,
    status: ""
}

const profileReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case "PROFILE_ADD_POST":
            let newPost = {
                id: 3,
                post: action.newPost,
                likeCounter: 0
            }
            return {
                ...state,
                posts: [newPost, ...state.posts],
            }
        case "PROFILE_DELETE_POST":
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case "PROFILE_SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "PROFILE_SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "PROFILE_SET_PHOTO":
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        case "PROFILE_SET_EDIT_MODE":
            return {
                ...state,
                isEditMode: action.isEditMode
            }
        default:
            return state
    }
}

export const actions = {
    addPost: (newPost: string) => ({type: "PROFILE_ADD_POST", newPost} as const),
    deletePost: (postId: number) => ({type: "PROFILE_DELETE_POST", postId} as const),
    setUserProfile: (profile: ProfileType) => ({type: "PROFILE_SET_USER_PROFILE", profile} as const),
    setStatusSuccess: (status: string) => ({type: "PROFILE_SET_STATUS", status} as const),
    setPhotoSuccess: (photos: PhotosType) => ({type: "PROFILE_SET_PHOTO", photos} as const),
    setEditMode: (isEditMode: boolean) => ({type: "PROFILE_SET_EDIT_MODE", isEditMode} as const)
}

export const getUserProfile = (userId: null | number): thunkType => async (dispatch) => { // помечаем санку как асинхронную функцию
    const data = await profileAPI.getProfile(userId) // присваиваем респонсу результат, которым зарезолвится промис из getProfile
    dispatch(actions.setUserProfile(data))
}

export const getProfileStatus = (userId: null | number): thunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId) // получить статус с сервера
    dispatch(actions.setStatusSuccess(data)) // когда с сервера придет статус, засетать его
}

export const updateProfileStatus = (status: string): thunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status) // закинуть статус на сервер, получить resultCode
        if (data.resultCode === resultCodeEnum.success) {
            dispatch(actions.setStatusSuccess(status)) // засетать статус
        }
    } catch (error) {
        alert(error) // какой тип у error? откуда берется?
    }
}

export const saveProfilePhoto = (image: File): thunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(image)
    if (data.resultCode === resultCodeEnum.success) {
        dispatch(actions.setPhotoSuccess(data.data.photos))
    }
}

export const saveProfileData = (profile: ProfileType): thunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId // получаем весь state, забираем id, который сидит в auth reducer
    const data = await profileAPI.saveProfileData(profile)
    if (data.resultCode === resultCodeEnum.success) {
        dispatch(getUserProfile(userId))
        dispatch(actions.setEditMode(false))
    } else {
        dispatch(actions.setEditMode(true))
    }
}

export default profileReducer