import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Tests on authReducer', () => {
    test('should return the default state', () => {
        const initialState = {};
        const state = authReducer(initialState, {});
        
        expect(state).toEqual(initialState);
    });

    test('should return an object with uid and name', () => {
        const initialState = {};
        const expected = {
            uid: '123456789abcde',
            name: 'Nicolas Rios',
        };
        const action = {
            type: types.login,
            payload: {
                uid: '123456789abcde',
                displayName: 'Nicolas Rios',
            },
        };
        const state = authReducer(initialState, action);
        
        expect(state).toEqual(expected);
    });

    test('should return an empty object when logout', () => {
        const initialState = {
            uid: '123456789abcde',
            name: 'Nicolas Rios',
        };
        const expected = {};
        const action = {
            type: types.logout,
        };
        const state = authReducer(initialState, action);
        
        expect(state).toEqual(expected);
    });
});
