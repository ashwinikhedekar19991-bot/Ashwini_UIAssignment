/**
 * MonthlyPoints Component
 * Displays per-month points
 */
const MonthlyPoints = ({ monthly }) => {
  return (
<table border="1" cellSpacing="8">
  <thead>
    <tr>
      <th>Month</th>
      <th>Points</th>
    </tr>
  </thead>
      <tbody>
        {Object.entries(monthly).map(([month, points]) => (
          <tr key={month}>
            <td>{month}</td>
            <td>{points}</td> 
            </tr>
        ))}
      </tbody>
      </table>
  );
};

export default MonthlyPoints;