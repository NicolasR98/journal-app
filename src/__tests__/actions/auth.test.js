import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const displayName = 'Testing name';
const uid = 'TESTING_UID';
const initialState = {};

let store = mockStore(initialState);

describe('tests on auth-actions', () => {
    beforeEach(() => {
        store = mockStore(initialState);
    });

    test('login & logout => should create a valid action', () => {
        const actionLogin = login(uid, displayName);
        const expectedLogin = {
            type: types.login,
            payload: {
                uid,
                displayName,
            }
        };

        const actionLogout = logout();
        const expectedLogout = { type: types.logout };

        expect(actionLogin).toEqual(expectedLogin);
        expect(actionLogout).toEqual(expectedLogout);
    });

    test('startLogout => should return a valid action', async () => {
        await store.dispatch(startLogout());
        const [actionLogout, actionLogoutCleanNotes] = store.getActions();
        
        const expectedLogout = { type: types.logout };
        const expectedLogoutCleanNotes = { type: types.notesLogoutClean };

        expect(actionLogout).toEqual(expectedLogout);
        expect(actionLogoutCleanNotes).toEqual(expectedLogoutCleanNotes);
    });

    test('startLoginEmailPassword => should return valid actions', async () => {
        const email = process.env.REACT_APP_FIREBASE_TEST_EMAIL;
        const password = process.env.REACT_APP_FIREBASE_TEST_PASSWORD;

        await store.dispatch(startLoginEmailPassword(email, password));
        const [
            actionStartIsLoading, 
            actionLogin, 
            actionStopIsLoading
        ] = store.getActions();

        const expectedActionStartIsLoading = { type: types.uiStartLoading };
        const expectedActionStopIsLoading = { type: types.uiStopLoading };
        const expectedActionLogin = {
            type: types.login,
            payload: {
                uid: process.env.REACT_APP_FIREBASE_TEST_UID,
                displayName: null
            },
        };

        expect(actionStartIsLoading).toEqual(expectedActionStartIsLoading);
        expect(actionStopIsLoading).toEqual(expectedActionStopIsLoading);
        expect(actionLogin).toEqual(expectedActionLogin);
    });
});