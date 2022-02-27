import React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUpload } from '../../actions/notes';

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector(state => state.notes);

  const inputFileSelector = useRef();

  const handleSave = () => {
    dispatch(startSaveNote(active));
  };

  const handlePictureUpload = () => {
    inputFileSelector.current.click();
  };

  const handleFileChange = ({ target }) => {
    const [file] = target.files;
    if (file) {
      dispatch(startUpload(file))
    }

  }

  return (
    <div className='notes__appbar'>
      <span>30th january of 2022</span>

      <input
        ref={inputFileSelector}
        type='file'
        name='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div>
        <button
          onClick={handlePictureUpload}
          className='btn'
        >
          Upload picture
        </button>

        <button
          className='btn'
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};
