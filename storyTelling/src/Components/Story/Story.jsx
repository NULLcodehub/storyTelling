import React from 'react';
import { Link } from 'react-router-dom';

const Story = ({story}) => {

    const handleStory = (data)=>{
        console.log(data.title)

        

    }

    return (
        
            
            <div className=' w-4/12 h-56 p-10 '>
                <h1 className='text-3xl text-red-500 uppercase font-semibold'>{story.title}</h1>
                <p className='my-5 text-white'>{story.content.substring(0,100) + "..."}</p>
                <Link to={`/stories/${story._id}`}><div className='text-center p-1  bg-red-500 '>Read Story</div></Link>
            </div>
    );
};

export default Story;