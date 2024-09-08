import axios from 'axios'
import { Children, createContext, useState,useEffect } from 'react'

const StoryContext = createContext()

export const StoryProvider=({ children })=>{
    
    const [stories,setStories]=useState([]);
    const [loading,setLoading]=useState(true)


    useEffect(()=>{
        
        const getStories= async ()=>{
            try {
                const responce =await axios.get('https://story-telling-api.vercel.app/stories/allstories')
                setStories(responce.data)
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
            
        }

        getStories()
    },[])

    return (
        <StoryContext.Provider value={{stories, loading}}>
            {children}
        </StoryContext.Provider>
    );

}

export default StoryContext;