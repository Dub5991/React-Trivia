import React from "react";

export default function Home({ formData, handleChange, fetchQuestion }) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Welcome to the Trivia Quiz!</h1>
      <p className="mt-4">Enter your name and select a category and difficulty to start the quiz.</p>
      <p className="mt-4">Good luck!</p>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">Select Category</option>
        <option value="9">General Knowledge</option>
        <option value="21">Sports</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
      </select>
      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
      >
        <option value="">Select Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button onClick={fetchQuestion}>Start Quiz</button>
    </div>
  );
}