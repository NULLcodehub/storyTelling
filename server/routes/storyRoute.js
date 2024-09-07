const express = require('express')
const {createStoryBranch,getStoryById,getAllStories} = require('../controller/storyController');
const { get } = require('mongoose');

const router=express.Router()


router.post('/create',createStoryBranch)

router.get('/allstories',getAllStories)

router.get('/:id',getStoryById)




module.exports=router