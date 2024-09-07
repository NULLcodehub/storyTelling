import React from 'react';

const Story = ({story}) => {



    return (
        <div className='px-5 py-5'>
            <div className='bg-red-600 p-10'>
                <h1 className='text-3xl text-white'>{story.title}</h1>
                <p >{story.content.substring(0,60) + "..."}</p>
            </div>
        </div>
    );
};

export default Story;