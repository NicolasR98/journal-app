import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";

import Swal from "sweetalert2";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };

        const { uid } = getState().auth;
        const docRef = await addDoc(collection(db, `${uid}`, 'journal/notes'), newNote);
        dispatch(activeNote(docRef?.id, newNote));
    };
};

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
};

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note,
    },
});

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes,
});

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url;
        };

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);

        await updateDoc(noteRef, noteToFirestore);

        dispatch(refreshNote(note.id, noteToFirestore));

        Swal.fire('Note Saved!', noteToFirestore.title, 'success')
    };
};

export const refreshNote = (id, note) => ({
    type: types.notesUpdate,
    payload: {
        id,
        note: {
            id,
            ...note,
        },
    }
});