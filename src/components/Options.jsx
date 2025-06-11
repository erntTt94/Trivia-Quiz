export default function Options({
  question,
  dispatch,
  answer,
  index,
  maxPoints,
}) {
  const answers = [...question.incorrectAnswers, question.correctAnswer].sort();
  return (
    <div className="options">
      {answers.map((option, inx) => {
        const isCorrectOption = option === question.correctAnswer;
        const isSelected = option === answer;
        return (
          <button
            className={`btn-option ${isSelected ? "active" : ""}`}
            key={inx}
            onClick={() => {
              index < maxPoints - 1
                ? dispatch({ type: "newAnswer", payload: option })
                : dispatch({ type: "finish" });
            }}
            disabled={!!answer}
          >
            {answer && (
              <>
                {isCorrectOption && (
                  <img src="./images/Check_round_fill.svg" alt="icon" />
                )}
                {isSelected && !isCorrectOption && (
                  <img src="./images/Close_round_fill.svg" alt="icon" />
                )}
              </>
            )}
            {option}
          </button>
        );
      })}
      ;
    </div>
  );
}
