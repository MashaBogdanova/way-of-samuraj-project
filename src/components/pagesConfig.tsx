import React, {ReactNode} from "react"
import Profile from "./Profile/Profile"
import Users from "./Users/Users"
import Dialogs from "./Dialogs/Dialogs"
import Chat from "./Chat/Chat"
import {
    SearchOutlined,
    SendOutlined,
    SettingOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons"

export type PagesType = {
    path: string
    title: string
    icon: any
    element: ReactNode
}

export const pages: PagesType[] = [
    {
        path: '/profile',
        title: "Profile",
        icon: <UserOutlined />,
        element: <Profile/>
    },
    {
        path: '/users',
        title: "Friends",
        icon: <SearchOutlined />,
        element: <Users/>
    },
    {
        path: '/dialogs',
        title: "Dialogs",
        icon: <SendOutlined />,
        element: <Dialogs/>
    },
    {
        path: '/chat',
        title: "Chat",
        icon: <TeamOutlined />,
        element: <Chat/>
    },
    {
        path: '/settings',
        title: "Settings",
        icon: <SettingOutlined />,
        element: <Profile/>
    }
]
