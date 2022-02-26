import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const { body, title } = formValues;

    const activeId = useRef(note.id);

    useEffect(() => {
        if (activeId.current !== note.id) {
            reset(note);
            activeId.current = note.id;
        };
    }, [note, reset]);

    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }));
    }, [dispatch, formValues]);

    return (
        <div className='notes__main-content'>
            <NotesAppBar />

            <div className='notes__content'>
                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder='What did you do today?'
                    className='notes__textarea'
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                />

                {(note.url) &&
                    <div className='notes__image'>
                        <img
                            src='https://images.unsplash.com/photo-1520962922320-2038eebab146?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                            alt='Roadtrip'
                        />
                    </div>
                }
            </div>
        </div>
    );
};
