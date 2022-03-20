import { uiReducer } from "../../reducers/uiReducer";
import { types } from "../../types/types";

describe('Tests on uiReducer', () => {
    const initialState = {
        isLoading: false,
        msgError: null,
    };
    const msgError = 'This is an error';

    test('should return the default state', () => {
        const state = uiReducer(initialState, {});

        expect(state).toEqual(initialState);
    });

    test('should set an error message', () => {
        const expected = {
            ...initialState,
            msgError: msgError
        };
        const action = {
            type: types.uiSetError,
            payload: msgError,
        };
        const state = uiReducer(initialState, action);

        expect(state).toEqual(expected);
    });

    test('should remove error message', () => {
        const initialStateForCase = {
            ...initialState,
            msgError,
        };
        const expected = initialState;
        const action = { type: types.uiRemoveError }

        const state = uiReducer(initialStateForCase, action);

        expect(state).toEqual(expected);
    });

    test('should set loading on true', () => {
        const expected = {
            ...initialState,
            isLoading: true,
        };
        const action = { type: types.uiStartLoading };
        const state = uiReducer(initialState, action);

        expect(state).toEqual(expected);
    });

    test('should set loading on false', () => {
        const expected = initialState;
        const initialStateForCase = {
            ...initialState,
            isLoading: true,
        };
        const action = { type: types.uiStopLoading };
        const state = uiReducer(initialStateForCase, action);

        expect(state).toEqual(expected);
    });
});