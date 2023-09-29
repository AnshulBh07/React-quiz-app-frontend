import "./startStyles.css";

const Start = ({ dispatch, questions }) => {
  return (
    <div className="container__start">
      <h1>Welcome to react quiz!</h1>
      <h2>{questions.length} questions to test your react mastery.</h2>
      <button
        className="start-btn"
        onClick={() => {
          dispatch({ type: "startQuiz" }); //no need to specify payload here
        }}
      >
        Let's start!
      </button>
    </div>
  );
};

export default Start;
