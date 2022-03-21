/**
* @jest-environment node
*/

import { deleteDoc, disableNetwork, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startLoadingNotes, startNewNote, startSaveNote } from '../../actions/notes';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const uid = 'TESTING_UID';
const initialState = {
    auth: {
        uid,
    },
};

let store = mockStore(initialState);

const payloadMock = {
    id: expect.any(String),
    title: '',
    body: '',
    date: expect.any(Number),
};

const noteIdFromDB = '8cxhrf4J4VR5D042OXY1';

describe('Tests on notes-actions', () => {
    afterAll(() => {
        disableNetwork(db);
    });
    beforeEach(() => {
        store = mockStore(initialState);
    });

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

    test('startLoadingNotes => should load notes', async () => {
        await store.dispatch(startLoadingNotes(uid));
        const [actionNotesLoad] = store.getActions();
        const expectedNoteMock = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        };
        const expected = {
            type: types.notesLoad,
            payload: expect.arrayContaining([expectedNoteMock]),
        };

        expect(actionNotesLoad).toEqual(expected);
    });

    test('startSaveNote => should save a note', async () => {
        const title = 'Title updated';
        const body = 'Body updated';
        const note = {
            id: noteIdFromDB,
            title,
            body,
        };
        const expected = {
            type: types.notesUpdate,
            payload: {
                id: noteIdFromDB,
                note: {
                    id: noteIdFromDB,
                    title,
                    body,
                },
            },
        };

        await store.dispatch(startSaveNote(note));
        const [actionSaveNote] = store.getActions();

        expect(actionSaveNote).toEqual(expected);
    });
});