import React from 'react';
import { Link } from 'react-router-dom';

const Story = ({story}) => {

    const handleStory = (data)=>{
        console.log(data.title)

        

    }

    return (
        
            
            <div className='bg-red-600 w-4/12 h-56 p-10 '>
                <h1 className='text-3xl text-white'>{story.title}</h1>
                <p className='my-5'>{story.content.substring(0,100) + "..."}</p>
                <Link to={`/stories/${story._id}`}>Read</Link>
            </div>
    );
};

export default Story;