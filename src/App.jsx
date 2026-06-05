/**
 * Main application component for the Reward Dashboard.
 *
 * Fetches and processes customer transaction data, provides
 * customer search functionality with debouncing, and displays
 * reward points grouped by customer and month.
 *
 * @component
 * @returns {JSX.Element} The Reward Dashboard application UI.
 */
import React, { useMemo, useState } from "react";
import { useTransactions } from "./hooks/useTransactions";
import { useDebounce } from "./hooks/useDebounce";
import CustomerCard from "./components/CustomerCard";
import MonthlyPoints from "./components/MonthlyPoints";
import SearchBar from "./components/SearchBar";
import './App.css';
function App() {
  const { processedData = {}, loading, error } = useTransactions();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const filteredCustomers = useMemo(() => {
    return Object.entries(processedData).filter(
      ([_, customer]) =>
        customer.name
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase())
    );
  }, [processedData, debouncedSearch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="app-container dashboard-container">
      <h1>Reward Dashboard</h1>

      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredCustomers.map(([id, cust]) => (
        <CustomerCard
          key={id}
          name={cust.name}
          total={cust.total}
        >
          <MonthlyPoints monthly={cust.monthly} />
        </CustomerCard>
      ))}
    </div>
  );
}

export default App;