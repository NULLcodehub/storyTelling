import { useState } from 'react'
import './App.css'
 
import {Route,Routes} from 'react-router-dom' 
import Home from './Components/Home/Home'
import StoryDetails from './Components/StoryDetails/StoryDetails'
import CreateStory from './Components/CreateStory/CreateStory'


function App() {


  return (
    <Routes>
      <Route path='/' element={<Home/>}/> 
      <Route path='/stories/:id' element={<StoryDetails/>}/>
      <Route path='/createStory' element={<CreateStory/>}/>
    </Routes>

  )
}

export default App
