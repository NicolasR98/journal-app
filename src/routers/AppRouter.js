import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { login } from '../actions/auth';
import { AuthRouter } from './AuthRouter';

import { JournalScreen } from '../components/journal/JournalScreen';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            const { uid = null, displayName = null } = user;

            if (uid && displayName) {
                dispatch(login(uid, displayName));
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        });

    }, [dispatch]);

    if (checking) {
        return <h1>Loading...</h1>
    }

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
