/**
 * Displays a table of points earned per month.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object.<string, number>} props.monthly - Object containing month names as keys and points as values.
 * @returns {JSX.Element} A table showing monthly points.
 */
const MonthlyPoints = ({ monthly }) => {
  return (
    <table border="1" cellSpacing="8">
      <thead>
        <tr>
          <th>Month</th>
          <th>Year</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(monthly).map(([monthYear, points]) => {
          const [month, year] = monthYear.split("-");
          return (
            <tr key={monthYear}>
              <td>{month}</td>
              <td>{year}</td>
              <td>{points}</td> 
          </tr>
          )
        })}
      </tbody>
    </table>
  );
};

export default MonthlyPoints;