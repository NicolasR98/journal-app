import { deleteDoc, disableNetwork, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startNewNote } from '../../actions/notes';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {
        uid: 'TESTING_UID',
    },
});
const payloadMock = {
    id: expect.any(String),
    title: '',
    body: '',
    date: expect.any(Number),
};
describe('Tests on notes-actions', () => {
    afterAll(() => {
        disableNetwork(db);
    })

    test('startNewNote => should create a new note', async () => {
        const { uid } = store.getState().auth;
        await store.dispatch(startNewNote());

        const actions = store.getActions();
        const expectedActionActiveNote = {
            type: types.notesActive,
            payload: payloadMock,
        };
        const expectedActionAddNewNote = {
            type: types.notesAddNew,
            payload: payloadMock,
        };
        const [actionActiveNote, actionAddNewNote] = actions;

        expect(actionActiveNote).toEqual(expectedActionActiveNote);
        expect(actionAddNewNote).toEqual(expectedActionAddNewNote);

        // Delete note on firestore
        const docId = actionActiveNote.payload.id;
        const noteRef = doc(db, `${uid}/journal/notes/${docId}`);
        await deleteDoc(noteRef);
    });
});