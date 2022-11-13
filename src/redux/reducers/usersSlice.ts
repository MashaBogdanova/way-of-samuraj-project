import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {UsersType} from "../../types/types";
import {fetchUsers} from "../actions/usersActions";

type InitialStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPageNumber: number
    isFetching: boolean
    followingInProgress: Array<number> // array of users id
    filter: FilterType
}

export type FilterType = {
    term: string
    friend: null | boolean
}


const initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPageNumber: 1,
    isFetching: true,
    followingInProgress: [],
    filter: {
        term: "",
        friend: null
    }
}

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // setUsers(state, action: PayloadAction<UsersType[]>) {
        //     state.users = action.payload
        // },
        setFilter(state, action: PayloadAction<FilterType>) {
            state.filter = action.payload
        },
        setCurrentPageNumber(state, action: PayloadAction<number>) {
            state.currentPageNumber = action.payload
        },
        setTotalUsersCount(state, action: PayloadAction<number>) {
            state.totalUsersCount = action.payload
        },
        followUser(state, action: PayloadAction<number>) {
            const userIndex = state.users.findIndex((user => user.id == action.payload))
            state.users[userIndex].followed = true
        },
        unfollowUser(state, action: PayloadAction<number>) {
            const userIndex = state.users.findIndex((user => user.id == action.payload))
            state.users[userIndex].followed = false
        }
        // + toggle is fetching
        // + set following in progress
    },
    extraReducers: {
        [fetchUsers.pending.type]: (state) => {
            state.isFetching = true
        },
        [fetchUsers.fulfilled.type]: (state, action: PayloadAction<UsersType[]>) => {
            state.isFetching = false
            state.users = action.payload
        },
        [fetchUsers.rejected.type]: (state) => {
            state.isFetching = false
            console.log("Error")
        }
    }
})

export default usersSlice.reducer