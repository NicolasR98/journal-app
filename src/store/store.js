import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';


const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,
});

export const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    ),
);
