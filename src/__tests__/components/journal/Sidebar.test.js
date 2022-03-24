import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}))

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn(), 
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const name = 'Name example'; 
const initialState = {
    auth: {
        uid: 'abcde123456',
        name,
    },
    notes: {
        notes: [],
    },
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    </Provider>
);

describe('Tests on <Sidebar />', () => {
    beforeEach(() => {
        store = mockStore(initialState);
    });

    test('should display correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should get the correct action when logout', () => {
        wrapper.find('button').prop('onClick')();
        
        expect(startLogout).toHaveBeenCalled();
    });

    test('should get the correct action when click on new entry', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        
        expect(startNewNote).toHaveBeenCalled();
    });
});