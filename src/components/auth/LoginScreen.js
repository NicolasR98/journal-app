import React from "react"
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { uiRemoveError, uiSetError } from "../../actions/ui";

import { useForm } from "../../hooks/useForm";

const initialState = {
    email: 'example@mail.com',
    password: '12345',
};

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const { msgError, isLoading } = useSelector(state => state?.ui);

    const [formValues, handleInputChange] = useForm(initialState)
    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startLoginEmailPassword(email, password));
        }
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    const isFormValid = () => {
        if (email.length === 0 || password.length === 0) {
            dispatch(uiSetError('Fields cannot be empty'))
            return false;
        } else if (!isEmail(email)) {
            dispatch(uiSetError('Email is not valid'));
            return false;
        } else if (password.length < 5) {
            dispatch(uiSetError('Password should be at least 6 characters long'));
            return false;
        } else if (msgError) {
            dispatch(uiRemoveError());
        };

        return true;
    };

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin}>
                {
                    msgError && (
                        <div className='auth__alert-error'>
                            {msgError}
                        </div>
                    )
                }
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    autoComplete="off"
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    className="btn btn-block btn-primary"
                    type="submit"
                    disabled={isLoading}
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img
                                className="google-icon"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="google button"
                            />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    className="link"
                    to="/auth/register"
                >
                    Create new account
                </Link>
            </form>
        </>
    );
};
