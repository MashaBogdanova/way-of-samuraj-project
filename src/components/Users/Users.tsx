import React, {FC, useEffect} from "react"
import style from "./Users.module.css"
import commonStyles from "./../../App.module.css"
import Pagination from "../common/Pagination/Pagination"
import User from "./User/User"
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm";
import {filterType, requestUsers, followUser, unfollowUser} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPageNumber,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/selectors/usersSelectors"
import Preloader from "../common/Preloader/Preloader"
import {AnyAction} from "redux"

const Users: FC = () => {

    useEffect(()=>{
        dispatch(requestUsers(currentPageNumber, pageSize, filter) as unknown as AnyAction)
    }, [])

    const isFetching = useSelector(getIsFetching)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPageNumber = useSelector(getCurrentPageNumber)
    const followingInProgress = useSelector(getFollowingInProgress)
    const users = useSelector(getUsers)
    const filter = useSelector(getUsersFilter)

    const dispatch = useDispatch()
    const onPageChange = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter) as unknown as AnyAction)
    }
    const onFilterChange = (filter: filterType) => {
        dispatch(requestUsers(1, pageSize, filter) as unknown as AnyAction)
    }
    const follow = (userId: number) => {
        dispatch(followUser(userId) as unknown as AnyAction)
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowUser(userId) as unknown as AnyAction)
    }

    return <div className={`${style.users} ${commonStyles.whiteBlock}`}>

        {isFetching && <Preloader/>}

        <UsersSearchForm onFilterChange={onFilterChange}/>

        <div>
            {users.map(u => <User key={u.id}
                                  user={u}
                                  follow={follow}
                                  unfollow={unfollow}
                                  followingInProgress={followingInProgress}/>
            )}
        </div>

        <Pagination totalItemsCount={totalUsersCount}
                    pageSize={pageSize}
                    currentPageNumber={currentPageNumber}
                    onPageChange={onPageChange}/>

    </div>
}

export default Users