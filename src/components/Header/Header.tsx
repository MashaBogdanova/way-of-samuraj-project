import React, {FC, useEffect} from "react"
import style from "./Header.module.css"
import logo from "../../uploads/images/logo.png"
import loginIcon from "../../uploads/images/login.png"
import {NavLink} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../hooks/redux"
import {signOut} from "../../redux/actions/authActions"
import {SmileOutlined} from "@ant-design/icons";
import MyPreloader from "../Utils/MyPreloader/MyPreloader";
import {initializeApp} from "../../redux/reducers/appSlice";
import {notification} from "antd";

const Header: FC = () => {

    const {isAuth, ownersAvatar} = useAppSelector(state => state.auth)
    const [api, contextHolder] = notification.useNotification()
    const dispatch = useAppDispatch()
    const logOut = () => {
        dispatch(signOut())
    }

    const openNotification = () => {
        api.open({
            message: 'Please authorize',
            description:
                `Test username: free@samuraijs.com Password: free`,
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };

    useEffect(() => {
        dispatch(initializeApp())
        openNotification()
    }, [])


    return <header className={style.header}>
        <>
            {contextHolder}
        </>

        <div className={style.logo}>
            <img src={logo}/>
        </div>

        <div className={style.loginArea}>
            {isAuth
                ? <div className={style.loginArea}>
                        <img className={style.avatar} src={ownersAvatar as string}/>
                    <div onClick={logOut}>Sign out</div>
                </div>
                : <NavLink className={style.loginArea} to={"/login"}>
                    <div>Sign in</div>
                    <img className={style.loginIcon} src={loginIcon}/>
                </NavLink>
            }
        </div>

    </header>
}

export default Header
