import {createStore} from 'redux';

const ACTIVE_MENU_ELEMENT = 'ACTIVE_MENU_ELEMENT';

const initialState = {
    activeMenuElement: "Home",
    friendsList: [],
}

export const setActiveMenuElement = (element) => ({
    type: ACTIVE_MENU_ELEMENT,
    payload: {element},
})

export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIVE_MENU_ELEMENT:
            return{
                ...state,
                activeMenuElement: action.payload.element,
            }
        default:
            return state;
    }

}

export const store = createStore(rootReducer);