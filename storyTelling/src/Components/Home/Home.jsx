import React, { useEffect } from 'react';
import "./Home.css"
import Story from '../Story/Story';
import axios from 'axios'



const Home = () => {


    useEffect(()=>{
        
    })



    return (
        <div className=''>
            <div className='flex justify-around py-4'>
                <div className='text-2xl font-bold'>StoryTelling</div>
                <button><div className='bg-red-500 p-3 rounded-md text-white hover:bg-red-600'>Write Your Own Story</div></button>
            </div>

            <div>
                <Story/>
            </div>

        </div>
    );
};

export default Home;