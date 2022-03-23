import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import Swal from 'sweetalert2';
import { googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from '../types/types'
import { logoutCleanNotes } from './notes';
import { uiSetError, uiStartLoading, uiStopLoading } from './ui';

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const logout = () => ({
    type: types.logout,
});

// To handle an async function, the helper must return another function
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(uiStartLoading());

        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                //Signed in
                dispatch(login(user?.uid, user?.displayName));
                dispatch(uiStopLoading());
            })
            .catch(err => {
                dispatch(uiSetError('Invalid email or password'))
                dispatch(uiStopLoading());
                return err
            })
    };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        dispatch(uiStartLoading());

        // Get auth and make a petition to firebase to create an user
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            // Once created, make a post req to firebase to update the current
            // user displayName (async)
            .then(async ({ user }) => {
                await updateProfile(user, { displayName: name });
                dispatch(login(user?.uid, user.displayName));
                dispatch(uiStopLoading());
                Swal.fire('Success!', 'User successfully registered', 'success');
            })
            .catch(err => {
                dispatch(uiSetError(`An error ocurred: ${err.code}`));
                dispatch(uiStopLoading());
            });
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

export const startLogout = () => {
    return async (dispatch) => {
        const auth = getAuth();
        await signOut(auth);
        dispatch(logout());
        dispatch(logoutCleanNotes());
    };
};