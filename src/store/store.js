import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from '../reducers/authReducer';


const reducers = combineReducers({
    auth: authReducer
});

export const store = createStore(
    reducers,
    composeWithDevTools(),
);
