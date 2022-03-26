import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { activeNote } from '../../../actions/notes';
import { JournalEntry } from '../../../components/journal/JournalEntry';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const id = 'Q7C0ctOr8e6ZbOuW5F3A';
const url = 'https://hello-world.com';
const date = new Date('March 24, 2022 11:35:00');
const title = 'initial title';
const body = 'initial body';
const note = {
    id,
    title,
    body,
    url,
    date,
};
const initialState = {};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <JournalEntry {...note} />
    </Provider>
)

describe('Tests on <JournalEntry />', () => {
    test('should display correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should trigger the correct action when click the entry', () => {
        const expected = {
            body,
            title,
            date,
            url,
        };
        const entry = wrapper.find('.journal__entry')
        entry.prop('onClick')();

        expect(activeNote).toHaveBeenCalledWith(id, expected);
    })
});