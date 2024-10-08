import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactCardFlip from 'react-card-flip';
import { useSwipeable } from 'react-swipeable';

const Quiz = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    const res = await axios.get('https://flashcards-2b7m.vercel.app/flashcards');
    setFlashcards(res.data);
  };

  const submitAnswer = async () => {
    const res = await axios.post(`https://flashcards-2b7m.vercel.app/flashcards/${flashcards[currentIndex]._id}/answer`, {
      selectedOption,
    });
    setResult(res.data.isCorrect);
    setIsFlipped(true);
  };

  const nextQuestion = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to the first question if at the end
    }
    setSelectedOption('');
    setResult(null);
    setIsFlipped(false);
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(flashcards.length - 1); // Loop to the last question if at the beginning
    }
    setSelectedOption('');
    setResult(null);
    setIsFlipped(false);
  };

  const handleSwipe = () => {
    submitAnswer();
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextQuestion(),
    onSwipedRight: () => prevQuestion(),
    onSwipedUp: () => handleSwipe(),
    onSwipedDown: () => handleSwipe(),
    trackMouse: true
  });

  if (flashcards.length === 0) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div {...handlers} className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Front of the card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-2xl">
          <div className="mb-6">
            <p className="text-2xl font-bold mb-4">{flashcards[currentIndex].question}</p>
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
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full"
                  />
                  <label htmlFor={`option-${index}`} className="ml-3 text-lg">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-between space-x-4">
            <button
              onClick={prevQuestion}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
            >
              Previous
            </button>
            <button
              onClick={submitAnswer}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Submit Answer
            </button>
            <button
              onClick={nextQuestion}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </div>

        {/* Back of the card */}
        <div className={`rounded-lg shadow-lg p-8 mx-auto max-w-2xl ${result === true ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          <div className="mb-6">
            <p className="text-2xl font-bold mb-4">
              {result === true ? 'Correct!' : `Incorrect! The correct answer is: ${flashcards[currentIndex].answer}`}
            </p>
          </div>
          <div className="mt-8 flex justify-between space-x-4">
            <button
              onClick={prevQuestion}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
            >
              Previous
            </button>
            <button
              onClick={nextQuestion}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Quiz;
