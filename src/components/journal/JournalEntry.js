import React from 'react';

export const JournalEntry = () => {
    return (
        <div className='journal__entry pointer'>
            <div
                className='journal__entry-picture'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1598398386929-4d5370672e9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1278&q=80)'
                }}
            />

            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    A new day
                </p>

                <p className='journal__entry-content'>
                    This is how it went... Sunt officia pariatur cupidatat labore non esse.
                </p>
            </div>
            
            <div className='journal__entry-date-box'>
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    );
};
