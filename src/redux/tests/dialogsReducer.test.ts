import dialogsReducer, {addMessage} from "../reducers/dialogsSlice"

let state = {
    dialog: [
        {id: 1, name: "marusik_super"},
        {id: 2, name: "notfat100kg"}
    ],
    messages: [
        {id: 1, message: "Привет, мы с Натуликом в лобби."},
        {id: 2, message: "Почему все так лагает?!"},
        {id: 3, message: "Марусик, поправь наушники!"}
    ]
}

test("The length of messages will be 4", () => {
    let action = addMessage("Test")
    let newState = dialogsReducer(state, action)

    expect(newState.messages.length).toBe(4)
})

test("The new message will be correct", () => {
    let action = addMessage("Test")
    let newState = dialogsReducer(state, action)

    expect(newState.messages[3].message).toBe("Test")
})