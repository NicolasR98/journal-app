import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import isEmail from 'validator/lib/isEmail'

import { removeError, setError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'

const initialState = {
    name: 'Hernando',
    email: 'example@mail.com',
    password: '12345',
    passwordConfirm: '12345',
};

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state?.ui);

    const [formValues, handleInputChange] = useForm(initialState);
    const { name, email, password, passwordConfirm } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            console.log(formValues);
        }
    };

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Name required'));
            return false;
        } else if (!isEmail(email)) {
            dispatch(setError('Email is not valid'));
            return false;
        } else if (password !== passwordConfirm || password.length < 5) {
            dispatch(setError('Password should be at least 6 characters long'));
            return false;
        } else {
            dispatch(removeError());
            return true;
        };
    };

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>
                {
                    msgError && (
                        <div className='auth__alert-error'>
                            {msgError}
                        </div>

                    )
                }
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={name}
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={email}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={password}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="passwordConfirm"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={passwordConfirm}
                />

                <button
                    className="btn btn-block btn-primary mb-5"
                    type="submit"
                >
                    Register
                </button>

                <Link
                    className="link"
                    to="/auth/login"
                >
                    Already registered?
                </Link>
            </form>
        </>
    )
}
