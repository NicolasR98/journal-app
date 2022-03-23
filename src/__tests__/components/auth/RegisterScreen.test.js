import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const msgError = 'Email is not valid';
const initialState = {
    auth: {},
    ui: {
        isLoading: false,
        msgError: null,
    },
};

let store = mockStore(initialState);

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
);

describe('Tests on <RegisterScreen />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should display correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should fire the correct actions if empty email given', () => {
        const emailInput = wrapper.find('input[name="email"]');
        emailInput.simulate('change', {
            target: {
                name: 'email',
                value: '',
            },
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        const [actionUi] = store.getActions();
        const expectedAction = {
            type: types.uiSetError,
            payload: msgError,
        };

        expect(actionUi).toEqual(expectedAction);
    });

    test('should display an error message if msgError contains data', () => {
        const initialState = {
            auth: {},
            ui: {
                isLoading: false,
                msgError,
            },
        };

        let store = mockStore(initialState);

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        const errorBox = wrapper.find('.auth__alert-error');

        expect(errorBox.exists()).toBeTruthy();
        expect(errorBox.text().trim()).toBe(msgError);
    });
});