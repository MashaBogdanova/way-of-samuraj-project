const ADD_MESSAGE = "dialogs/ADD_MESSAGE";

type initialStateType = typeof initialState;
type dialogType = {
    id: number
    name: string
}
type messagesType = {
    id: number,
    message: string
}
let initialState = {
    dialog: [
        {id: 1, name: "marusik_super"},
        {id: 2, name: "notfat100kg"}
    ] as Array<dialogType>,
    messages: [
        {id: 1, message: "message 1"},
        {id: 2, message: "message 2"},
        {id: 3, message: "message 3"}
    ] as Array<messagesType>
};

const dialogsReducer = (state = initialState, action:any): initialStateType  => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 5,
                message: action.newMessageText
            };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        default:
            return state;
    }
}

type addMessageActionType = {
    type: typeof ADD_MESSAGE,
    newMessageText: string
}
export const addMessage = (newMessageText:string): addMessageActionType => ({type: ADD_MESSAGE, newMessageText});

export default dialogsReducer;