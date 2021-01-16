import API from '../../api'
import { removeLocalStorage } from '../../utils/localStorage'
import { LOGIN_REQUEST, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_REQUEST } from '../types'
export const loginUser = (data) => {
    return async dispatch => {
        dispatch({ type: LOGIN_REQUEST })

        const result = await API.Account.login(data)
        console.log(result)
        if (result.error) {
            dispatch({ type: LOGIN_FAILED, payload: result })
        } else if (result.statusCode === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: result.data
            })
        }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        dispatch({ type: LOGOUT_REQUEST })
       
            removeLocalStorage('persist:auth')
            window.location.href = '/'
    }
}

export const forceLogoutUser = () => {
    removeLocalStorage('persist:auth')
    window.location.href = '/'
}
