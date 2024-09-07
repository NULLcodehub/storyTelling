const express = require('express')
const createStoryBranch = require('../controller/storyController');
const router=express.Router()


router.post('/create',createStoryBranch)




module.exports=router