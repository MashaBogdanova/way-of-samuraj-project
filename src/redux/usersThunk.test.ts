import {usersAPI} from "../api/usersAPI";
import {responseType, resultCodeEnum} from "../api/api";
import {actions, follow, unfollow} from "./usersReducer";

jest.mock("../api/usersAPI") // делаем заглушку для API
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn() // создаем фейковый диспатч, чтобы не лезть в стор
const getStateMock = jest.fn()

beforeEach( () => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.followUser.mockClear()
    userAPIMock.unfollowUser.mockClear()
})

const result: responseType = {
    resultCode: resultCodeEnum.success,
    messages: [],
    data: {}
}

userAPIMock.followUser.mockReturnValue(Promise.resolve(result)) // возвращает фейковый ответ
userAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result)) // возвращает фейковый ответ




test("success follow thunk", async() => {

    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setFollowingInProgress(false,1))

})

test("success unfollow thunk", async() => {

    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setFollowingInProgress(false,1))

})