import React from "react";

const QuestionForm = ({ questionData, selectedAnswer, setSelectedAnswer, handleSubmitAnswer }) => ( // Destructure the props objects to get the required values
  <div>
    <h2 className="text-xl font-bold">{questionData.question}</h2>
    {questionData.answers.map((answer) => (
      <div key={answer} className="mt-2">
        <label>
          <input
            type="radio"
            name="answer"
            value={answer}
            checked={selectedAnswer === answer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />
          {" "}{answer} 
        </label>
      </div>
    ))}
    <button onClick={handleSubmitAnswer} className="bg-green-500 text-white p-2 rounded mt-2">Submit Answer</button> 
  </div>
);

export default QuestionForm;
