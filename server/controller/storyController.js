const Story = require('../models/story');

const createStoryBranch = async (req, res) => {
  try {
    const story = await createRecursiveStory(req.body,true);
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRecursiveStory = async (data,isRoot) => {
  const { title, content, choices } = data;
  console.log(title,content,choices)
  const newStory = new Story({ title, content,isRoot });

  if (choices && choices.length > 0) {
    for (let choice of choices) {
      const nextBranch = await createRecursiveStory(choice.nextBranch,false); 
      newStory.choices.push({ text: choice.text, nextBranch: nextBranch._id });
    }
  }

  await newStory.save();
  return newStory;
};


const getStoryById = async (req, res) => {
  console.log( "first",req.params.id)
  try {
    const id= req.params.id
    // console.log(id)
    const story = await Story.findById(id).populate('choices.nextBranch');
    // console.log(story)
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllStories=async (req,res)=>{
  try {
      const stories=await Story.find({isRoot:true})

      const rootBranch= stories.map(story=>({
        _id:story._id,
        title:story.title,
        content:story.content
      }))
      // console.log(rootBranch)
      res.send(rootBranch);
  } catch (error) {
    console.log(error.massage)
    res.send(error.message)
  }


}





module.exports = {createStoryBranch, getStoryById,getAllStories};
