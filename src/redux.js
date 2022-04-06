import {createStore} from 'redux';

const ACTIVE_MENU_ELEMENT = 'ACTIVE_MENU_ELEMENT';
const SET_USER_ID = 'SET_USER_ID';

const initialState = {
    activeMenuElement: "Home",
    userID: "",
    friendsList: [],
}

export const setActiveMenuElement = (element) => ({
    type: ACTIVE_MENU_ELEMENT,
    payload: {element},
})

export const setUserID = (userID) => ({
    type: SET_USER_ID,
    payload: {userID},
})

export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIVE_MENU_ELEMENT:
            return{
                ...state,
                activeMenuElement: action.payload.element,
            }
        case SET_USER_ID:
            return{
                ...state,
                userID: action.payload.userID,
            }
        default:
            return state;
    }

}

export const store = createStore(rootReducer);