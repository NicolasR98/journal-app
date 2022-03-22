/**
* @jest-environment node
*/
import { deleteDoc, disableNetwork, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { writeFileSync, readFileSync, unlinkSync } from 'fs';

import { startDelete, startLoadingNotes, startNewNote, startSaveNote, startUpload } from '../../actions/notes';
import { types } from '../../types/types';
import { fileUpload } from '../../helpers/fileUpload';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const noteIdFromDB = '8cxhrf4J4VR5D042OXY1';
const noteIdFromDBImageUpload = 'Q7C0ctOr8e6ZbOuW5F3A';
const uid = 'TESTING_UID';
const urlMock = 'https://hello-world.com';
const initialState = {
    auth: {
        uid,
    },
    notes: {
        active: {
            id: noteIdFromDBImageUpload,
            title: 'initial title',
            body: 'initial body',
        },
    },
};
const payloadMock = {
    id: expect.any(String),
    title: '',
    body: '',
    date: expect.any(Number),
};

let store = mockStore(initialState);

describe('Tests on notes-actions', () => {
    afterAll(() => {
        // Prevent memory leak
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
    test('startDeleting => should delete a note', async () => {
        const noteMock = {
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        };

        // Create new note and upload it in Firestore
        await store.dispatch(startNewNote());
        const [, actionActiveNote] = store.getActions();

        // Check that the recently created note exists in firestore and get the id
        const docId = actionActiveNote.payload.id;
        const noteRef = doc(db, `${uid}/journal/notes/${docId}`);
        const docRefBeforeDelete = await getDoc(noteRef);

        // Delete the note
        await store.dispatch(startDelete(docId));

        // Check that does not exist anymore
        const docRefAfterDelete = await getDoc(noteRef);

        expect(docRefBeforeDelete.data()).toEqual(noteMock);
        expect(docRefAfterDelete.data()).toBeUndefined();
    });

    test('startUpload => should update the url of the entry', async () => {
        // Get ref of note on Firestore
        const noteRef = doc(db, `${uid}/journal/notes/${noteIdFromDBImageUpload}`);
        const { url } = await (await getDoc(noteRef)).data();

        // Write and read a fake file for passing it as a param, with Node
        fileUpload.mockReturnValue(urlMock);
        writeFileSync('picture.jpg', '');
        const file = readFileSync('picture.jpg');

        await store.dispatch(startUpload(file));

        expect(url).toBe(urlMock);

        // Delete fake file
        unlinkSync('picture.jpg');
    });
});