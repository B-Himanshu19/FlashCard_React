import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    const res = await axios.get('http://localhost:5000/flashcards');
    setFlashcards(res.data);
  };

  const submitAnswer = async () => {
    const res = await axios.post(`http://localhost:5000/flashcards/${flashcards[currentIndex]._id}/answer`, {
      selectedOption,
    });
    setResult(res.data.isCorrect);
  };

  const nextQuestion = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setSelectedOption('');
    setResult(null);
  };

  if (flashcards.length === 0) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl">
        <div className="mb-6">
          <p className="text-xl font-bold text-gray-800 mb-6">{flashcards[currentIndex].question}</p>
          <div className="space-y-4">
            {flashcards[currentIndex].options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  id={`option-${index}`}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full"
                />
                <label htmlFor={`option-${index}`} className="ml-3 text-lg text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        {result !== null && (
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-800">
              {result ? 'Correct!' : `Incorrect! The correct answer is: ${flashcards[currentIndex].answer}`}
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-between space-x-4">
          {result === null ? (
            <button
              onClick={submitAnswer}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
