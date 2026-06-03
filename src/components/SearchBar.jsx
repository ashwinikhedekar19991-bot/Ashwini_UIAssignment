/**
 * SearchBar Component
 * @param {string} value
 * @param {function} onChange
 */
const SearchBar = ({ value, onChange }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Search customer"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default SearchBar;