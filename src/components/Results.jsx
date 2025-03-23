import React from "react";

const Results = ({ formData = { name: "Player" }, result = { correct: false, correctAnswer: "" }, setQuestionData, loadNextQuestion, streak }) => (
  <div className="mt-4">
    <p>
      {formData.name}, you {result.correct ? "got it right! 🎉" : "got it wrong. 😢"}
    </p>
    {!result.correct && <p>The correct answer was: {result.correctAnswer}</p>}
    <p className="mt-2">Current Streak: {streak} {streak === 1 ? "question" : "questions"} in a row!</p>
    <div className="mt-2">
      {result.correct ? (
        <button
          onClick={loadNextQuestion}
          className="bg-green-500 text-white p-2 rounded mr-2"
        >
          Next Question
        </button>
      ) : (
        <button
          onClick={() => setQuestionData(null)}
          className="bg-red-500 text-white p-2 rounded"
        >
          Try Again
        </button>
      )}
    </div>
  </div>
);

export default Results;