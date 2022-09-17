import React, {FC} from "react"
import {HashRouter, Route, Routes} from "react-router-dom"
import {connect, Provider} from "react-redux"
import {initializeApp} from "./redux/appReducer"
import Preloader from "./components/common/Preloader/Preloader"
import HeaderContainer from "./components/Header/HeaderContainer"
import Navbar from "./components/Navbar/Navbar"
import FriendsBlock from "./components/FriendsBlock/FriendsBlock"
import store, {stateType} from "./redux/reduxStore"
import commonStyles from "./App.module.css"

const Dialogs = React.lazy(() => import("./components/Dialogs/Dialogs"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const Users = React.lazy(() => import("./components/Users/Users"))
const Login = React.lazy(() => import("./components/Login/Login"))

type mapPropsType = {
    initialized: boolean
}
type dispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component <mapPropsType & dispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className={commonStyles.App}>
                <HeaderContainer/>
                <Navbar/>
                <FriendsBlock/>
                <div className={commonStyles.content}>
                    <React.Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route path="/*"
                                   element={<ProfileContainer/>}/>
                            <Route path="/profile/:userId/*"
                                   element={<ProfileContainer/>}/>
                            <Route path="/dialogs/*"
                                   element={<Dialogs/>}/>
                            <Route path="/users/*"
                                   element={<Users/>}/>
                            <Route path="/login/*"
                                   element={<Login/>}/>
                            <Route path="*"
                                   element={<div>404 NOT FOUND</div>}/>
                        </Routes>
                    </React.Suspense>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: stateType) => ({
    initialized: state.app.initialized
})

const AppContainer = connect(mapStateToProps, {initializeApp})(App)

const MainAppComponent: FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default MainAppComponent