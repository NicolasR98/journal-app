import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { login } from '../actions/auth';
import { AuthRouter } from './AuthRouter';

import { JournalScreen } from '../components/journal/JournalScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user?.uid && user?.displayName) {
                dispatch(login(user?.uid, user?.displayName));
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
                <Route path="/" element={
                    <PrivateRoute>
                        <JournalScreen />
                    </PrivateRoute>
                } />
                <Route path="/auth" element={
                    <PublicRoute>
                        <AuthRouter />
                    </PublicRoute>
                } />
                <Route path="*" element={
                    <PublicRoute>
                        <AuthRouter />
                    </PublicRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
};
