import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const email = 'test@example.com';
const password = '123456';
const initialState = {
    auth: {},
    ui: {
        isLoading: false,
        msgError: null,
    },
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe('Tests on <LoginScreen />', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        jest.clearAllMocks();
    });

    test('should display correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should fire the action startGoogleLogin when click on google button', () => {
        // Find google button and click it
        wrapper.find('.google-btn').prop('onClick')();

        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test('should fire the action startLoginEmailPassword with desired params', () => {
        // Get input fields
        const inputEmail = wrapper.find('input[name="email"]');
        const inputPassword = wrapper.find('input[name="password"]');

        // Simulate putting credentials
        inputEmail.simulate('change', { target: { value: email, name: 'email' } });
        inputPassword.simulate('change', { target: { value: password, name: 'password' } });

        // Get form and submit
        wrapper.find('form').prop('onSubmit')({
            preventDefault() { }
        });

        expect(startLoginEmailPassword).toHaveBeenCalledWith(email, password);
    });
});