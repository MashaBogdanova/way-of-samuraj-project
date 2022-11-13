import React, {FC, useEffect} from "react"
import style from "./Users.module.css"
import commonStyles from "./../../App.module.css"
import MyPagination from "../Utils/Pagination/MyPagination"
import User from "./User/User"
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm"
import Preloader from "../Utils/Preloader/Preloader"
import {useNavigate, useSearchParams} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../hooks/redux"
import {fetchUsers, followUser, unfollowUser} from "../../redux/actions/usersActions"
import {FilterType} from "../../redux/reducers/usersSlice"

const Users: FC = () => {

    const {users, filter, totalUsersCount, currentPageNumber, pageSize, isFetching, followingInProgress} =
        useAppSelector(state => state.users)

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const dispatch = useAppDispatch()

    const onPageChange = (pageNumber: number) => {
        dispatch(fetchUsers(pageNumber, pageSize, filter))
    }
    const onFilterChange = (filter: FilterType) => {
        dispatch(fetchUsers(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(followUser(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowUser(userId))
    }

    useEffect(() => {
        // @ts-ignore
        const urlParams = Object.fromEntries([...searchParams])

        let urlCurrentPageNumber = currentPageNumber
        let urlFilter = filter

        if (urlParams.page) urlCurrentPageNumber = Number(urlParams.page)
        if (urlParams.term) urlFilter = {...filter, term: urlParams.term}
        if (urlParams.friend) urlFilter = {
            ...filter,
            friend: urlParams.friend === "null" ? null : urlParams.friend = !!"true"
        }

        dispatch(fetchUsers(urlCurrentPageNumber, pageSize, urlFilter))
    }, [])

    useEffect(() => {
        navigate({
            pathname: '/users',
            search: `?term=${filter.term}&friends=${filter.friend}&page=${currentPageNumber}`
        })
    }, [filter, currentPageNumber])

    return <div className={`${style.users} ${commonStyles.whiteBlock}`}>

        {isFetching && <Preloader/>}

        <UsersSearchForm onFilterChange={onFilterChange}/>

        {users.map(u => <User key={u.id}
                              user={u}
                              follow={follow}
                              unfollow={unfollow}
                              followingInProgress={followingInProgress}/>
        )}

        <MyPagination totalItemsCount={totalUsersCount}
                      pageSize={pageSize}
                      currentPageNumber={currentPageNumber}
                      onPageChange={onPageChange}
                      className={style.pag}
        />

    </div>
}

export default Users