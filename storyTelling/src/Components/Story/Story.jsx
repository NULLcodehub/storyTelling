import React from 'react';
import { Link } from 'react-router-dom';

const Story = ({story}) => {

    const handleStory = (data)=>{
        console.log(data.title)

        

    }

    return (
        
            
        <div className='bg-gray-800 text-white p-4 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-semibold mb-2'>{story.title}</h1>
        <p className='mb-4'>{story.content.substring(0, 100) + "..."}</p>
        <Link to={`/stories/${story._id}`}>
            <div className='text-center p-2 bg-red-500 rounded cursor-pointer hover:bg-red-600'>
                Read Story
            </div>
        </Link>
    </div>
    );
};

export default Story;