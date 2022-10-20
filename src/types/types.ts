export type postsType = {
    id: number
    post: string
    likeCounter: number
}
export type photosType = {
    small: string | null
    large: string | null
}
export type profileType = {
    userId?: null | number
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: contactsType
    photos: photosType
}
export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type usersType = {
    id: number
    name: string
    status: string | null
    photos: photosType
    followed: boolean
}
export type dialogType = {
    id: number
    name: string
}
export type messagesType = {
    id: number,
    message: string
}