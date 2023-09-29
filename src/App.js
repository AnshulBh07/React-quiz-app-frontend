// #282c34 - bgcolor
import "./App.css";
import ReactLogo from "./logo.svg";
import Question from "./components/Questions";
import Loading from "./components/Loading";
import Start from "./components/Start";
import { useEffect, useReducer } from "react";
import { quesArray } from "./quesData";
import ScoreCard from "./components/ScoreCard";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  //our app can have various status so we can have multiple statuses like loading,error,ready,active,finished
  status: "loading",
  ques_index: 0, //keeps track of question number
  answer: null, //user chosen answer state
  score: 0, //keeps track of total score
  secondsRemaining: null, //seconds remianing to serve as timer for quiz
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return initialState;
    case "dataReceived":
      return { ...initialState, questions: action.payload, status: "ready" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: SECS_PER_QUESTION * state.questions.length,
      };
    case "newAnswer":
      return { ...state, answer: action.payload };
    case "nextQuestion":
      return {
        ...state,
        ques_index: state.ques_index + 1,
        answer: null,
        score: state.score + action.payload,
      };
    case "getScore":
      return {
        ...state,
        ques_index: state.ques_index + 1,
        answer: null,
        score: state.score + action.payload,
        status: "finished",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unkown Action");
  }
}

function App() {
  // usereducer is just a useState with more power as it can handle multiple states at the same time
  const [
    { status, questions, ques_index, answer, score, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "dataReceived", payload: quesArray });
    console.log(questions);
  }, [questions]);

  return (
    <div className="app">
      <div className="container__header">
        <img src={`${ReactLogo}`} alt="React logo" />
        <h1>the react quiz</h1>
      </div>
      <main className="container__main">
        {status === "loading" && <Loading />}
        {status === "ready" && (
          <Start dispatch={dispatch} questions={questions} />
        )}
        {status === "active" && (
          <Question
            dispatch={dispatch}
            questions={questions}
            ques_index={ques_index}
            answer={answer}
            score={score}
            secondsRemaining={secondsRemaining}
          />
        )}
        {status === "finished" && (
          <ScoreCard score={score} dispatch={dispatch} questions={questions} />
        )}
      </main>
    </div>
  );
}

export default App;
