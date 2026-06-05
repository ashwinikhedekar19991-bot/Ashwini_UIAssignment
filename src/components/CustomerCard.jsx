import React, { memo } from "react";
/**
 * CustomerCard Component
 * Displays customer/ summary
 */
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