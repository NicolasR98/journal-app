import { createUserWithEmailAndPassword, getAuth, signInWithPopup, updateProfile } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from '../types/types'

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

// To handle an async function, the helper must return another function
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(login(123, 'nicolas'));
        }, 3500);
    };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        // Get auth and make a petition to firebase to create an user
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            // Once created, make a post req to firebase to update the current
            // user displayName (async)
            .then(async ({ user }) => {
                await updateProfile(user, { displayName: name });
                dispatch(
                    login(user?.uid, user.displayName)
                );
            })
            .catch(err => err);
    };
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch(
                    login(user?.uid, user?.displayName)
                );
            })
            .catch(e => console.log(e));
    };
};