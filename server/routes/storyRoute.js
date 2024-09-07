const express = require('express')
const {createStoryBranch,getStoryById} = require('../controller/storyController');

const router=express.Router()


router.post('/create',createStoryBranch)




router.get('/:id',getStoryById)




module.exports=router