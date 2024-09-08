import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const CreateStory = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [branches, setBranches] = useState([{ title: '', content: '', choices: [] }]);

  const handleBranchChange = (index, event) => {
    const { name, value } = event.target;
    const updatedBranches = [...branches];
    updatedBranches[index][name] = value;
    setBranches(updatedBranches);
  };

  const handleAddBranch = () => {
    setBranches([...branches, { title: '', content: '', choices: [] }]);
  };

  const handleChoiceChange = (branchIndex, choiceIndex, event) => {
    const { name, value } = event.target;
    const updatedBranches = [...branches];
    const updatedChoices = [...updatedBranches[branchIndex].choices];
    updatedChoices[choiceIndex][name] = value;
    updatedBranches[branchIndex].choices = updatedChoices;
    setBranches(updatedBranches);
  };

  const handleAddChoice = (branchIndex) => {
    const updatedBranches = [...branches];
    updatedBranches[branchIndex].choices.push({ text: '', nextBranch: {} });
    setBranches(updatedBranches);
  };

  const handleAddNestedChoice = (branchIndex, choiceIndex) => {
    const updatedBranches = [...branches];
    const updatedChoices = [...updatedBranches[branchIndex].choices];
    updatedChoices[choiceIndex].nextBranch = { title: '', content: '', choices: [] };
    updatedBranches[branchIndex].choices = updatedChoices;
    setBranches(updatedBranches);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const storyData = {
        title,
        content,
        choices: branches.map(branch => ({
          text: branch.title,
          nextBranch: branch.choices.map(choice => ({
            text: choice.text,
            nextBranch: choice.nextBranch ? { title: choice.nextBranch.title, content: choice.nextBranch.content, choices: [] } : {}
          }))
        }))
      };
      await axios.post('http://localhost:5000/stories/create', storyData);
      alert('Story created successfully!');
    } catch (error) {
      console.error('Error creating story:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className='p-2 text-white text-center'>This page is <span className='text-red-500'>not Functional</span> yet. But I have Saved Story Data using Postman and my API</div>
    <div className="flex justify-center items-center min-h-screen p-4 ">
      <div>
        
      </div>
      <div className="w-full max-w-4xl  p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-500">Create Story</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Story Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>

            <label className="block text-sm font-medium mb-1 text-white">Story Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {branches.map((branch, branchIndex) => (
            <div key={branchIndex} className="border border-gray-300 p-4 rounded-lg bg-gray-50">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Branch {branchIndex + 1}</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-600">Branch Title:</label>
                <input
                  type="text"
                  name="title"
                  value={branch.title}
                  onChange={(e) => handleBranchChange(branchIndex, e)}
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-600">Branch Content:</label>
                <textarea
                  name="content"
                  value={branch.content}
                  onChange={(e) => handleBranchChange(branchIndex, e)}
                  className="border border-gray-300 rounded px-3 py-2 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => handleAddChoice(branchIndex)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Add Choice
              </button>
              {branch.choices.map((choice, choiceIndex) => (
                <div key={choiceIndex} className="border border-gray-300 p-4 rounded-lg mt-4 bg-gray-50">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-600">Choice Text:</label>
                    <input
                      type="text"
                      name="text"
                      value={choice.text}
                      onChange={(e) => handleChoiceChange(branchIndex, choiceIndex, e)}
                      className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddNestedChoice(branchIndex, choiceIndex)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Add Nested Choice
                  </button>
                  {choice.nextBranch && (
                    <div className="border border-gray-300 p-4 rounded-lg mt-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Nested Branch</h3>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-600">Nested Branch Title:</label>
                        <input
                          type="text"
                          name="title"
                          value={choice.nextBranch.title}
                          onChange={(e) => handleChoiceChange(branchIndex, choiceIndex, e)}
                          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-600">Nested Branch Content:</label>
                        <textarea
                          name="content"
                          value={choice.nextBranch.content}
                          onChange={(e) => handleChoiceChange(branchIndex, choiceIndex, e)}
                          className="border border-gray-300 rounded px-3 py-2 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddBranch}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Add Branch
          </button>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
          >
            Submit Story
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default CreateStory;
