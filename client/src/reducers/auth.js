/* eslint-disable no-unneeded-ternary */
import {
    LOGIN_REQUEST,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_REQUEST
} from '../actions/types'

const initialState = {

    user: {},
    authToken: null,
    isAuthenticated: false

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case LOGIN_REQUEST:

        return {
            ...state,
            loading: true
        }
    case LOGIN_FAILED:

        return {
            ...state,
            error: true,
            loading: false,
            message: action.payload.data.message
        }
    case LOGIN_SUCCESS:
        return {
            ...state,
            loading: false,
            error: false,
            message: '',
            isAuthenticated: true,
            user: action.payload.user,
            authToken: action.payload.auth_token ? action.payload.auth_token : state.authToken,
        }
    case LOGOUT_REQUEST:
        return {
            ...state,
            loading: false,
            error: false,
            message: null,
            isAuthenticated: false,
            user: {},
            authToken: null
        }
    default: return state
    }
}

export default authReducer
