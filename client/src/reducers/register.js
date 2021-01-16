import {
    SIGNUP_REQUEST,
    SIGNUP_FAILED,
    SIGNUP_SUCCESS
} from '../actions/types'

const register = (state = [], action) => {
    switch (action.type) {
    case SIGNUP_REQUEST:
        return {
            ...state,
            registerLoading: true
        }
    case SIGNUP_FAILED:
        return {
            ...state,
            registerLoading: false,
            registerError: true,
            registerMessage: action.payload.message
        }
    case SIGNUP_SUCCESS:
        return {
            ...state,
            registerLoading: false,
            registerError: false,
            registerSuccess: true,
            registerMessage: action.payload.message
        }
    case 'RESET_SIGNUP_STATE':
        return {
            ...state,
            registerLoading: false,
            registerError: false,
            registerSuccess: false,
            registerMessage: null
        }
    default: return state
    }
}

export default register
