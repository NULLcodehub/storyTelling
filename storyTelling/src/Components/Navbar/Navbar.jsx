import React from 'react';
import {Link} from 'react-router-dom'
const Navbar = () => {
    return (
        <div>

            <div className='flex justify-around py-4'>
                <Link to='/'><div className='text-2xl text-white font-bold'>StoryTelling</div></Link>
                <button><div className='bg-red-500 p-3 rounded-md text-white hover:bg-red-600'>Write Your Own Story</div></button>
            </div>

        </div>
    );
};

export default Navbar;