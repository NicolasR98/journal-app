import { db } from "../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { activeNote } from "../reducers/notesReducer";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };
        const { uid } = getState().auth;

        const docRef = await addDoc(collection(db, `${uid}`, 'journal/notes'), newNote);

        dispatch(activeNote(docRef?.id, newNote))
    };
};