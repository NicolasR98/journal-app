import { notesReducer } from "../../reducers/notesReducer";
import { types } from "../../types/types";

describe('tests on notesReducer', () => {
    const initialState = {
        notes: [],
        active: null,
    };
    const noteMock = {
        title: 'Title example 1',
        body: 'Body example',
        date: new Date('2022-03-20T20:24:00').getTime(),
    };
    const idMock = '123456789abcde';
    const noteListMock = [
        { ...noteMock },
        { ...noteMock, title: 'Title example 2', id: idMock },
        { ...noteMock, title: 'Title example 3' },
        { ...noteMock, title: 'Title example 4' },
    ];

    test('should return the default state', () => {
        const state = notesReducer(initialState, {});

        expect(state).toEqual(initialState);
    });

    test('should add a note into notes', () => {
        const initialStateForCase = {
            ...initialState,
            notes: noteListMock,
        };
        const newNote = {
            ...noteMock,
            title: 'Title example 5',
            id: idMock,
        };
        const expected = {
            ...initialStateForCase,
            notes: [newNote, ...initialStateForCase.notes],
        };
        const action = {
            type: types.notesAddNew,
            payload: newNote,
        };
        const state = notesReducer(initialStateForCase, action);

        expect(state).toEqual(expected);
    });

    test('should load notes', () => {
        const action = {
            type: types.notesLoad,
            payload: noteListMock,
        };
        const expected = {
            ...initialState,
            notes: noteListMock,
        };
        const state = notesReducer(initialState, action);

        expect(state).toEqual(expected);
    });

    test('should return active notes', () => {
        const active = {
            ...noteMock,
            id: idMock,
        }
        const expected = {
            ...initialState,
            active,
        };
        const action = {
            type: types.notesActive,
            payload: active,
        }
        const state = notesReducer(initialState, action);

        expect(state).toEqual(expected);
    });

    test('should update a note', () => {
        const noteUpdated = {
            ...noteMock,
            title: 'Title example updated',
            id: idMock,
        };
        const initialStateForCase = {
            ...initialState,
            notes: noteListMock,
        };
        const action = {
            type: types.notesUpdate,
            payload: {
                id: idMock,
                note: noteUpdated
            },
        };
        const state = notesReducer(initialStateForCase, action);

        expect(state.notes).toContain(noteUpdated);
    });

    test('should delete a note in notes', () => {
        const initialStateForCase = {
            ...initialState,
            notes: noteListMock,
        };
        const notesExpectedLength = noteListMock.length - 1;
        const target = noteListMock.find(note => note.id === idMock);
        const action = {
            type: types.notesDelete,
            payload: idMock,
        };
        const state = notesReducer(initialStateForCase, action);

        expect(state.notes).toHaveLength(notesExpectedLength);
        expect(state.notes).not.toContain(target);
    });

    test('should set initial state when logout', () => {
        const action = { type: types.notesLogoutClean };
        const initialStateForCase = {
            ...initialState,
            notes: noteListMock,
        };
        const state = notesReducer(initialStateForCase, action);

        expect(state).toEqual(initialState);
    });
});