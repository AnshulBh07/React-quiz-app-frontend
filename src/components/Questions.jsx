import "./questionsStyles.css";
import ProgressBar from "./ProgressBar";
import { useEffect } from "react";

const Question = ({
  dispatch,
  questions,
  ques_index,
  answer,
  score,
  secondsRemaining,
}) => {
  // console.log(questions[index].correctAns);
  console.log(answer);
  const hasAnswered = answer !== null;
  console.log(score);

  function handleNextClick(e) {
    const val = e.target.innerText;
    console.log(val);

    if (answer === questions[ques_index].correctAns) {
      dispatch({
        type: `${val === "Next" ? "nextQuestion" : "getScore"}`,
        payload: questions[ques_index].points,
      });
    } else {
      dispatch({
        type: `${val === "Next" ? "nextQuestion" : "getScore"}`,
        payload: 0,
      });
    }
  }

  //useEffect hook for timer
  useEffect(() => {
    //timer start
    const id = setInterval(() => dispatch({ type: "tick" }), 1000);

    //timer end with cleanup function
    return () => clearInterval(id);
  }, [dispatch]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = Math.floor(secondsRemaining % 60);

  return (
    <div className="container__question">
      {/* Progress bar */}
      <ProgressBar
        ques_index={ques_index}
        score={score}
        questions={questions}
      />
      {/* question statement */}
      <div className="ques">
        <h3 className="ques_no">{ques_index + 1}.</h3>
        <h3 className="ques_statement">{questions[ques_index].question}</h3>
      </div>

      {/* options */}
      <div className="choices">
        {/* map buttons here for options */}
        {questions[ques_index].options.map((option, option_index) => {
          return (
            //on click of an option we see these things happening on screen
            //1. The right answer is displayed with color of ur choice and if the wrong is chosen,
            //it is also displayed
            //2. Progress Bar is updated and score is updated
            <button
              // first add the class to change selected button and other buttons, then add another
              //condition to check whether selected is right or wrong
              className={`option-btn ${
                hasAnswered
                  ? option_index === questions[ques_index].correctAns
                    ? "correct"
                    : option_index === answer
                    ? "answer"
                    : "wrong"
                  : ""
              }  ${option_index === answer ? "answer" : ""}`}
              disabled={hasAnswered} //if answer exists disable buttons
              key={option_index}
              onClick={() => {
                dispatch({ type: "newAnswer", payload: option_index });
              }}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* timer and next button */}
      <div className="container__timer-btn">
        <div
          className="timer"
          style={
            secondsRemaining < 60
              ? { color: "#e22a0a", border: "2px solid #e22a0a" }
              : {}
          }
        >
          {minutes < 10 && "0"}
          {minutes}:{seconds < 10 && "0"}
          {seconds}
        </div>
        {/* Now we need to think what happens on next button click
        1. next question with index is displayed that is index is incremented  
        2. timer is reset*/}
        <button
          className="next-btn"
          //enable only when an answer exists
          disabled={!hasAnswered}
          onClick={handleNextClick}
        >
          {ques_index === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Question;
