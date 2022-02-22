import { db } from "../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";

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