/**
 * MonthlyPoints Component
 * Displays per-month points
 */
const MonthlyPoints = ({ monthly }) => {
  return (
    <>
      <ul>
        {Object.entries(monthly).map(([month, points]) => (
          <li key={month}>{month}: {points}</li>
        ))}
      </ul>
    </>
  );
};

export default MonthlyPoints;