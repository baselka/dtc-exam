import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import auth from './auth'
import book from './book'
import register from './register'



const authPersistConfig = {
    key: 'auth',
    storage: storage,
    blacklist: ['error', 'loading', 'message']
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, auth),
    book,
    register

})

export default rootReducer
