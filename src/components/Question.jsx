import Options from "./Options";

export default function Question({
  question,
  dispatch,
  answer,
  index,
  maxPoints,
}) {
  return (
    <div className="question">
      <h4>{question.question.text}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        index={index}
        maxPoints={maxPoints}
      />
    </div>
  );
}
