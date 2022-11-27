import React, {FC, useEffect} from "react"
import {HashRouter, Route, Routes} from "react-router-dom"
import {Provider, useSelector} from "react-redux"
import 'antd/dist/antd.css'
import commonStyles from "./App.module.css"
import Navbar from "./components/Navbar/Navbar"
import FriendsBlock from "./components/FriendsBlock/FriendsBlock"
import MyPreloader from "./components/Utils/MyPreloader/MyPreloader"
import Header from "./components/Header/Header"
import {getInitialized} from "./redux/selectors/appSelectors"
import {store} from "./redux/store"
import {initializeApp} from "./redux/reducers/appSlice"
import {NavMenu} from "./components/NavMenu/NavMenu"
import {useAppDispatch} from "./hooks/redux"

const Profile = React.lazy(() => import("./components/Profile/Profile"))
const Users = React.lazy(() => import("./components/Users/Users"))
const Dialogs = React.lazy(() => import("./components/Dialogs/Dialogs"))
const Chat = React.lazy(() => import("./components/Chat/Chat"))
const Login = React.lazy(() => import("./components/Login/Login"))


const App: FC = () => {
    const initialized = useSelector(getInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initialized) {
        return <MyPreloader/>
    }

    return <div className={commonStyles.App}>
        <Header/>
        <Navbar/>
        <FriendsBlock/>
        <div className={commonStyles.content}>
            <React.Suspense fallback={<MyPreloader/>}>
                <Routes>
                    <Route path="/profile/*"
                           element={<Profile/>}/>
                    <Route path="*"
                           element={<Profile/>}/>
                    <Route path="/profile/:userId/*"
                           element={<Profile/>}/>
                    <Route path="/users/*"
                           element={<Users/>}/>
                    <Route path="/dialogs/*"
                           element={<Dialogs/>}/>
                    <Route path="/chat/*"
                           element={<Chat/>}/>
                    <Route path="/login"
                           element={<Login/>}/>
                </Routes>
            </React.Suspense>
        </div>
        <NavMenu/>
    </div>
}


const AppRouter: FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>
}

export default AppRouter