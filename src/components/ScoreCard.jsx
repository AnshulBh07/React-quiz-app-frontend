import "./scoreStyles.css";

const ScoreCard = ({ score, dispatch, questions }) => {
  console.log(score);
  let totalPoints = 0;

  questions.forEach((item) => (totalPoints += item.points));

  return (
    <div className="container__score">
      <div className="score-info">
        You scored {score} out of {totalPoints}{" "}
        {`(${Math.round((score / totalPoints) * 100)}%)`}
      </div>
      <button
        className="retry-btn"
        onClick={() => dispatch({ type: "loading" })}
      >
        Retry?
      </button>
    </div>
  );
};

export default ScoreCard;
