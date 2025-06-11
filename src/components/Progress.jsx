export default function Progress({ index, maxPoints }) {
  return (
    <div className="progress">
      {Array.from({ length: maxPoints }).map((_el, i) => (
        <span key={i} className={`per-progress ${index >= i ? "active" : ""}`}>
          {i + 1}
        </span>
      ))}
    </div>
  );
}
