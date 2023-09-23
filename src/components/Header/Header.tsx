import React, {FC} from "react"
import style from "./Header.module.css"
import logo from "../../uploads/images/logo.png"
import loginIcon from "../../uploads/images/login.png"
import {NavLink} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../hooks/redux"
import {signOut} from "../../redux/actions/authActions"

const Header: FC = () => {

    const {isAuth, ownersAvatar} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const logOut = () => {
        dispatch(signOut())
    }


    return <header className={style.header}>

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
