import React, { useState } from "react";
import { useTransactions } from "./hooks/useTransactions";
import { useDebounce } from "./hooks/useDebounce";
import CustomerCard from "./components/CustomerCard";
import MonthlyPoints from "./components/MonthlyPoints";
import SearchBar from "./components/SearchBar";

function App() {
  const { processedData, loading, error } = useTransactions();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  const filteredCustomers = Object.entries(processedData).filter(
    ([_, customer]) =>
      customer.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <>
      <h1>Reward Dashboard</h1>

      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredCustomers.map(([id, cust]) => (
        <CustomerCard key={id} name={cust.name} total={cust.total}>
          <MonthlyPoints monthly={cust.monthly} />
        </CustomerCard>
      ))}
    </>
  );
}

export default App;