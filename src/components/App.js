import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import Progress from "./Progress";
import Finished from "./Finished";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "active",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctAnswer
            ? state.points + 1
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "reset":
      return {
        ...state,
        status: "active",
        index: 0,
        answer: null,
        points: 0,
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const maxPoints = questions.length;

  useEffect(function () {
    fetch("https://the-trivia-api.com/v2/questions/")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  useEffect(
    function () {
      if (answer === null) return;
      const timer = setTimeout(() => {
        dispatch({ type: "nextQuestion" });
      }, 1000);
      return () => clearTimeout(timer);
    },
    [answer]
  );

  return (
    <div className="app">
      {status !== "finished" && (
        <Header points={points} maxPoints={maxPoints} />
      )}
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Progress index={index} maxPoints={maxPoints} />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              index={index}
              maxPoints={maxPoints}
            />
          </>
        )}
        {status === "finished" && (
          <Finished maxPoints={maxPoints} points={points} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}

export default App;
