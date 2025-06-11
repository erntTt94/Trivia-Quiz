export default function Header({ points, maxPoints }) {
  return (
    <header className="app-header">
      <h1>Trivia Quiz</h1>
      <p>
        <span>
          🎖️ {points} / {maxPoints} Points
        </span>
      </p>
    </header>
  );
}
