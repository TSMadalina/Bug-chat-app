export const initialState = {
    user: null,
}

//everytime we're gonna log in, we're setting the user
export const actionTypes = {
    SET_USER: 'SET_USER',
}
 
//state is what the data looks like, action is what we're 
//trying to do to the data (ex. pushing information, setting the user)
const reducer = (state, action) => {
    console.log(action);

    //listens to the action type and returns the state we're in and the user
    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            }
        default: 
            return state;
    }
}

export default reducer;