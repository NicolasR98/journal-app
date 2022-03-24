import React from 'react';
import { mount } from "enzyme";
import { Provider } from "react-redux";

import thunk from "redux-thunk";
import configureStore from 'redux-mock-store';

import { NoteScreen } from "../../../components/notes/NoteScreen";
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const uid = 'TESTING_UID';
const initialState = {
    auth: {
        uid,
    },
    notes: {
        active: {
            id: '1234',
            body: 'Testing body',
            title: 'Testing title',
            date: 0,
        },
        notes: [],
    },
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen />
    </Provider>
)

describe('Tests on <NoteScreen />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should display correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should trigger the correct action when the input changes', () => {
        const title = 'Title updated';
        const expected = {
            id: '1234',
            body: 'Testing body',
            title,
            date: 0,
        };
        const inputTitle = wrapper.find('input[name="title"]');
        inputTitle.simulate('change', {
            target: {
                name: 'title',
                value: title
            },
        });

        expect(activeNote).toHaveBeenLastCalledWith(expected.id, expected);
    });
});