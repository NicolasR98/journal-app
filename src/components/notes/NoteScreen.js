import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange] = useForm(note);

    const { body, title } = formValues;

    return (
        <div className='notes__main-content'>
            <NotesAppBar />

            <div className='notes__content'>
                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder='What did you do today?'
                    className='notes__textarea'
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
