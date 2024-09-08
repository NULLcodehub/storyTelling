import React, { useContext, useEffect, useState } from 'react';
import "./Home.css"
import Story from '../Story/Story';
import axios from 'axios'

import StoryContext from '../../StoryCentext/StoryContext';
import Navbar from '../Navbar/Navbar'


const Home = () => {

    const {stories,loading}=useContext(StoryContext)
    console.log(stories,loading)



    return (
        <>
        <Navbar/>
        <div className='mx-10 home-div'>
            
           
            <div className='flex gap-10   '>

                {
                    stories.length > 0 ? (
                        stories.map((story)=>(
                            // <h1>{story.title}</h1>
                            <Story story={story} key={story._id}/>
                        ))

                    ) : ( <p>story not availabe</p>)
                }
                
            </div>
            

        </div>
        </>
    );
};

export default Home;