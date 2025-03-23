import React, { useState } from "react";
import Home from "./Home";  
import QuestionForm from "./QuestionForm"; 
import Results from "./Results"; 

// Ensure these components exist and are correctly implemented in their respective files.


function QuizApp() {
  const [formData, setFormData] = useState({ name: "", category: "", difficulty: "" });
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [streak, setStreak] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      console.log("Updated Form Data:", updatedData); // Debugging log
      return updatedData;
    });
  };
  

  const fetchQuestion = async () => {
    console.log("Form Data Before Validation:", formData); // Debugging log
  
    if (!formData.name.trim() || !formData.category || !formData.difficulty) { //Trim the name to remove any leading/trailing whitespaces, then check if the name, category, and difficulty are not empty
      alert("All fields are required");
      return;
    }
  
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=1&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`
      );
      const data = await res.json();
  
      if (data.results.length) {
        const question = data.results[0];
        const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5); // Randomize the order of the answers
        console.log("Fetched Question Data:", question); // Debugging log
  
        setQuestionData({ ...question, answers });
        setSelectedAnswer("");
        setResult(null);
      } else {
        alert("No questions found for this category/difficulty.");
      }
    } catch (error) {
      alert("Failed to fetch question. Please try again.");
      console.error("Fetch error:", error);
    }
  };
  
  
  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      alert("Please select an answer");
      return;
    }
    const isCorrect = selectedAnswer === questionData.correct_answer;
    setResult({ correct: isCorrect, correctAnswer: questionData.correct_answer });
  
    if (isCorrect) {
      setStreak((prevStreak) => prevStreak + 1); // Increment streak if correct
    } else {
      setStreak(0); // Reset streak if incorrect
    }
  };

  const loadNextQuestion = async () => {
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=1&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`
      );
      const data = await res.json();

      if (data.results.length) {
        const question = data.results[0];
        const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);
        setQuestionData({ ...question, answers });
        setSelectedAnswer("");
        setResult(null);
      } else {
        alert("No more questions found for this category/difficulty.");
      }
    } catch (error) {
      alert("Failed to fetch the next question. Please try again.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      {!questionData ? (
        <Home 
          formData={formData} 
          handleChange={handleChange} 
          fetchQuestion={fetchQuestion} 
        />
      ) : !result ? (
        <QuestionForm 
          questionData={questionData} 
          selectedAnswer={selectedAnswer} 
          setSelectedAnswer={setSelectedAnswer} 
          handleSubmitAnswer={handleSubmitAnswer} 
        />
      ) : (
        <Results 
          formData={formData} 
          result={result} 
          setQuestionData={() => {
            setQuestionData(null);
            setStreak(0); // Reset streak when restarting
          }} 
          loadNextQuestion={loadNextQuestion} 
          streak={streak} 
        />
      )}
    </div>
  );
}


export default QuizApp;
