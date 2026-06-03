import React, { memo } from "react";

/**
 * CustomerCard Component
 * Displays customer summary
 */
const CustomerCard = ({ name, total, children }) => {
  return (
    <>
      <h2>{name}</h2>
      {children}
      <h4>Total Points: {total}</h4>
    </>
  );
};

export default memo(CustomerCard);