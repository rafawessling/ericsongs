import { combineReducers } from 'redux';
import authReducer from './auth/authSlice';
import searchReducer from './search/searchSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
});

export default rootReducer;
