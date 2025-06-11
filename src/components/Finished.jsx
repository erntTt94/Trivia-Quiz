export default function Finished({ maxPoints, points, dispatch }) {
  return (
    <div className="finished">
      <img src="./images/congrats.png" alt="congrats" />
      <p>Congrats! You completed the quiz.</p>
      <p>
        You answer {points} / {maxPoints} correctly
      </p>
      <button onClick={() => dispatch({ type: "reset" })}>Play again</button>
    </div>
  );
}
