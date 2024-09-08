import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './StoryDetails.css'
import Navbar from '../Navbar/Navbar';

import {ClimbingBoxLoader, GridLoader} from 'react-spinners'


const StoryDetails = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const [choiceLoad,setChoiceLoad]=useState(false)

  useEffect(() => {
    const fetchStory = async () => {
      
      try {
        const response = await axios.get(`https://story-telling-api.vercel.app/stories/${id}`);
        setStory(response.data);
        
      } catch (err) {
        setError('Error fetching story details');
        console.error(err);
      } finally {
        setLoading(false);
       
      }
    };

    fetchStory();
  }, [id]);

  const handleChoiceClick = async (id) => {
    // console.log(id)
    setChoiceLoad(true)
    try {
      const response = await axios.get(`https://story-telling-api.vercel.app/stories/${id._id}`);
      setSelectedChoice(response.data);
    } catch (err) {
      setError('Error fetching next branch');
      console.error(err);
    }finally{
      setChoiceLoad(false)
    }
  };



  if (loading) return (

    
      <>
                <div className='h-screen flex justify-center items-center'><ClimbingBoxLoader color={'white'}/></div>
      </>
    
  );
  if (error) return <p>{error}</p>;
  if (!story && !selectedChoice) return <p>No story found</p>;

  const displayStory = selectedChoice || story;

  return (

    <>  
    <Navbar/>
    <section className='md:m-10 flex justify-center' >
      <div className=' md:w-6/12 mt-14 md:mt-0  md:border-2  p-5'>
    
        <h1 className='text-3xl font-bold text-red-500 uppercase'>{displayStory.title}</h1>
        <div className='px-2 content-div'>
          <p className='text-white mt-10'>{displayStory.content}</p>
        </div>

        
        {displayStory.choices && displayStory.choices.length > 0 && (

          <div className='flex-col justify-center  mt-20 '>
            
            {displayStory.choices.map((choice, index) => (
              <div key={index} className='w-6/12 inline'>
              <button className='bg-red-500  rounded   my-2 p-2 w-full h-26 font-bold text-black hover:bg-red-600 ' onClick={() => handleChoiceClick(choice.nextBranch)}>
                  {choiceLoad ? <GridLoader color={'white'} size={3}/> : `${choice.text}`}
                </button> 
                
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  );
};

export default StoryDetails;
