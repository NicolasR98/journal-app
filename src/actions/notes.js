import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";

import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

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
        dispatch(addNewNote(docRef.id, newNote));
    };
};

const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note,
    },
});

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

export const startUpload = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading file...',
            text: 'Please wait...',
            allowOutsideClick: false,
            willOpen: () => { Swal.showLoading() }
        })

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

        dispatch(startSaveNote(activeNote));

        Swal.close();
    };
};

export const startDelete = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const noteRef = doc(db, `${uid}/journal/notes/${id}`);

        // Delete note on firestore
        await deleteDoc(noteRef);

        // Delete note on store
        dispatch(deleteNote(id));

        Swal.fire('Note deleted!', 'Note deleted successfully', 'success')
    };
};

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id,
});

export const logoutCleanNotes = () => ({
    type: types.notesLogoutClean,
});