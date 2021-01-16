/* eslint-disable camelcase */
import API from '../../api'
import { SIGNUP_REQUEST, SIGNUP_FAILED, SIGNUP_SUCCESS, LOGIN_SUCCESS } from '../types'

export const registerUser = ({ name, email, password}) => {
    return async dispatch => {
        dispatch({ type: SIGNUP_REQUEST })

        const result = await API.Account.register({
            name: name,
            email: email,
            password: password,
        })
console.log(result)
        if (result.error) {
            console.log(result.data)
            dispatch({ type: SIGNUP_FAILED, payload: result.data })
        } else if (result.statusCode === 201) {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: result
            })
            // LOGIIN USER AFTER REGISTER IS SUCCESSFULLY DONE .
          /*   dispatch({
                type: LOGIN_SUCCESS,
                payload: result
            }) */
        }
    }
}
