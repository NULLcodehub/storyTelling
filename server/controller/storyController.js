const Story = require('../models/story');

const createStoryBranch = async (req, res) => {
  try {
    const story = await createRecursiveStory(req.body);
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRecursiveStory = async (data) => {
  const { title, content, choices } = data;
  console.log(title,content,choices)
  const newStory = new Story({ title, content });

  if (choices && choices.length > 0) {
    for (let choice of choices) {
      const nextBranch = await createRecursiveStory(choice.nextBranch); 
      newStory.choices.push({ text: choice.text, nextBranch: nextBranch._id });
    }
  }

  await newStory.save();
  return newStory;
};



module.exports = createStoryBranch;
