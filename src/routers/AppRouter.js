import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { login } from '../actions/auth';
import { AuthRouter } from './AuthRouter';

import { JournalScreen } from '../components/journal/JournalScreen';

export const AppRouter = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            const { uid = null, displayName = null } = user;

            if (uid && displayName) {
                dispatch(login(uid, displayName));
            }
        });

    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<JournalScreen />} />
                <Route path="/auth" element={<AuthRouter />} />
                <Route path="*" element={<AuthRouter />} />
            </Routes>
        </BrowserRouter>
    );
};
