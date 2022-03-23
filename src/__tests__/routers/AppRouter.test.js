import React from 'react';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const email = process.env.REACT_APP_FIREBASE_TEST_EMAIL;
const password = process.env.REACT_APP_FIREBASE_TEST_PASSWORD;
const uid = process.env.REACT_APP_FIREBASE_TEST_UID;
const initialState = {
    auth: {},
    ui: {
        isLoading: false,
        msgError: null,
    },
    notes: {
        active: {
            id: 'ABC'
        },
        notes: []
    }
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe('Tests on <AppRouter />', () => {
    test('should login if already are valid credentials', async () => {
        await act(async () => {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            mount(
                <Provider store={store}>
                    <AppRouter />
                </Provider>
            );
        });
        expect(login).toHaveBeenCalledWith(uid, null);
    });
});