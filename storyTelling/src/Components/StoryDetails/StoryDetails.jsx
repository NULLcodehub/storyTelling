import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StoryDetails = () => {
  const { id } = useParams(); // Get the story ID from the URL
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/stories/${id}`);
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
    try {
      const response = await axios.get(`http://localhost:5000/stories/${id._id}`);
      setSelectedChoice(response.data);
    } catch (err) {
      setError('Error fetching next branch');
      console.error(err);
    }
  };

  const renderBranch = (branch) => {
    return (
      <div key={branch._id} style={{ marginLeft: '20px' }}>
        <h3>{branch.title}</h3>
        <p>{branch.content}</p>
        {branch.choices && branch.choices.length > 0 && (
          <div>
            <h4>Choices:</h4>
            {branch.choices.map((choice, index) => (
              <div key={index} style={{ marginLeft: '20px' }}>
                <button onClick={() => handleChoiceClick(choice.nextBranch)}>
                  {choice.text}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!story && !selectedChoice) return <p>No story found</p>;

  const displayStory = selectedChoice || story;

  return (
    <div>
      <h1>{displayStory.title}</h1>
      <p>{displayStory.content}</p>
      {displayStory.choices && displayStory.choices.length > 0 && (
        <div>
          <h2>Choices:</h2>
          {displayStory.choices.map((choice, index) => (
            <div key={index}>
              <button onClick={() => handleChoiceClick(choice.nextBranch)}>
                {choice.text}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryDetails;
