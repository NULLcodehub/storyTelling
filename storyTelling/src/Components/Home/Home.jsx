import React, { useContext, useEffect, useState } from 'react';
import "./Home.css"
import Story from '../Story/Story';
import axios from 'axios'

import StoryContext from '../../StoryCentext/StoryContext';
import Navbar from '../Navbar/Navbar'

import {ClimbingBoxLoader} from 'react-spinners'


const Home = () => {

    const {stories,loading}=useContext(StoryContext)
    console.log(stories,loading)

    if(loading){
        return(
            <>
                <div className='h-screen flex justify-center items-center'><ClimbingBoxLoader color={'white'}/></div>
            </>
        )
    }

    return (
        <>
        <Navbar />
        <div className='mx-10 py-6'>
            <div className='flex flex-wrap justify-center gap-4'>
                {stories.length > 0 ? (
                    stories.map((story) => (
                        <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 py-4' key={story._id}>
                            <Story story={story} />
                        </div>
                    ))
                ) : (
                    <p>Story not available</p>
                )}
            </div>
        </div>
    </>
    );
};

export default Home;