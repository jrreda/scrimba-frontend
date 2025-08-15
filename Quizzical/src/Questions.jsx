import React, { useEffect, useState, useCallback } from "react";
import { decode } from "html-entities";

// Constants
const API_CONFIG = {
  BASE_URL: "https://opentdb.com/api.php",
  AMOUNT: 5,
  DIFFICULTY: "medium",
  TYPE: "multiple",
};

const API_URL = `${API_CONFIG.BASE_URL}?amount=${API_CONFIG.AMOUNT}&difficulty=${API_CONFIG.DIFFICULTY}&type=${API_CONFIG.TYPE}`;

// Helper functions
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const processQuestionData = (rawQuestions) => {
  return rawQuestions.map((question) => ({
    ...question,
    id: `${question.question}-${Date.now()}-${Math.random()}`,
    question: decode(question.question),
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]).map((answer) => decode(answer)),
    userAnswer: "",
  }));
};

// Components
const LoadingSpinner = () => (
  <div className="loading">
    <h2>Loading...</h2>
  </div>
);

const QuestionItem = ({
  question,
  onAnswerChange,
  isDisabled,
  showResults,
}) => {
  const getAnswerClassName = (answer) => {
    if (!showResults) return "radio";

    const isUserAnswer = question.userAnswer === answer;
    const isCorrectAnswer = question.correct_answer === answer;

    if (isCorrectAnswer) {
      return "radio correct-answer";
    }

    if (isUserAnswer && !isCorrectAnswer) {
      return "radio incorrect-answer";
    }

    return "radio";
  };

  return (
    <div className="question-item">
      <h2>{question.question}</h2>
      <div className="answers">
        {question.answers.map((answer, index) => {
          const inputId = `${question.id}-${index}`;

          return (
            <div key={inputId} className={getAnswerClassName(answer)}>
              <input
                type="radio"
                name={question.id}
                id={inputId}
                value={answer}
                onChange={onAnswerChange}
                disabled={isDisabled}
                checked={question.userAnswer === answer}
              />
              <label htmlFor={inputId}>{answer}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ScoreDisplay = ({ score, totalQuestions, onPlayAgain }) => (
  <div className="score">
    <h2>
      You scored {score}/{totalQuestions} correct answers
    </h2>
    <button type="button" onClick={onPlayAgain}>
      Play Again
    </button>
  </div>
);

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [isShowingResults, setIsShowingResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const calculateScore = useCallback(() => {
    return questions.filter(
      (question) => question.correct_answer === question.userAnswer
    ).length;
  }, [questions]);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.response_code !== 0) {
        throw new Error("Failed to fetch questions from API");
      }

      const processedQuestions = processQuestionData(data.results);
      setQuestions(processedQuestions);
    } catch (err) {
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAnswerChange = useCallback((event) => {
    const { name: questionId, value: selectedAnswer } = event.target;

    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? { ...question, userAnswer: selectedAnswer }
          : question
      )
    );
  }, []);

  const handleCheckAnswers = useCallback(
    (event) => {
      event.preventDefault();
      const finalScore = calculateScore();
      setScore(finalScore);
      setIsShowingResults(true);
    },
    [calculateScore]
  );

  const handleNewGame = useCallback(() => {
    setScore(0);
    setIsShowingResults(false);
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  if (loading) {
    return (
      <div className="questions">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="questions">
      <form onSubmit={handleCheckAnswers}>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onAnswerChange={handleAnswerChange}
            isDisabled={isShowingResults}
            showResults={isShowingResults}
          />
        ))}

        {isShowingResults ? (
          <ScoreDisplay
            score={score}
            totalQuestions={API_CONFIG.AMOUNT}
            onPlayAgain={handleNewGame}
          />
        ) : (
          <button type="submit" className="check-answers-btn">
            Check Answers
          </button>
        )}
      </form>
    </div>
  );
}
