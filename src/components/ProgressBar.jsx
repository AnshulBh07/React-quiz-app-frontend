import "./progressStyles.css";

const ProgressBar = ({ ques_index, score, questions }) => {
  const styles = {
    width: `${(ques_index / questions.length) * 100}%`,
    transition: "0.2s ease-in-out",
  };
  let totalPoints = 0;

  questions.forEach((ques) => (totalPoints += ques.points));
  //   console.log(totalPoints);

  return (
    <div className="container__progressBar">
      <div className="bar">
        <div className="inner-bar" style={styles}></div>
      </div>
      <div className="info">
        <p>
          Question {ques_index + 1} / {questions.length}
        </p>
        <p>
          {score} / {totalPoints} points
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
