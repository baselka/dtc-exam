/* eslint-disable no-unneeded-ternary */
import {
    ADD_BOOK_SUCCESS,
    ADD_BOOK_REQUEST,
    ADD_BOOK_FAILED,
    UPDATE_BOOK_REQUEST,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_FAILED,
    DELETE_BOOK_REQUEST,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAILED
} from '../actions/types'

const initialState = {

    books: {}

}

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOOK_REQUEST:

            return {
                ...state,
                loading: true
            }
        case ADD_BOOK_FAILED:

            return {
                ...state,
                error: true,
                loading: false,
                message: action.payload
            }
        case ADD_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                message: '',
            }
        default: return state
    }
}

export default booksReducer
