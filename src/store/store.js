import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from '../reducers/authReducer';


const reducers = combineReducers({
    auth: authReducer
});

export const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    ),
);
