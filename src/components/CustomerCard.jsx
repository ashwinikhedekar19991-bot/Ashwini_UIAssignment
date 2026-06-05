/**
 * Displays customer information and total reward points.
*
* @component
* @param {Object} props - Component props.
* @param {string} props.name - Customer name.
* @param {number} props.total - Total reward points earned by the customer.
* @param {React.ReactNode} props.children - Additional content to render inside the card.
* @returns {JSX.Element} A customer summary card.
*/
import React, { memo } from "react";
const CustomerCard = ({ name, total, children }) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      {children}
      <h4 className="total">Total Points: <span className="total-points">{total}</span></h4>
    </div>
  );
};

export default memo(CustomerCard);