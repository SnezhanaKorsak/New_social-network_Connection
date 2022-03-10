import {addPostAC, deletePostAC, profileReducer} from "./profileReducer";

const startState = {
    posts: [
        {
            id: 1,
            message: "Work hard to get what you like, otherwise you'll be forced to just like what you get.",
            likeCount: 15
        },
        {
            id: 2,
            message: "Success is the ability to go from failure to failure without losing your enthusiasm.",
            likeCount: 20
        }
    ],
    newPostText: '',
    profile: null,
    status: ''
}

test('new post should be added', () => {
   const action = addPostAC("new text")
    let newState = profileReducer(startState, action)

    expect(newState.posts.length).toBe(3)
});

test('post should be deleted', () => {
    const action = deletePostAC(1)
    let newState = profileReducer(startState, action)

    expect(newState.posts.length).toBe(1)
});