/**
 * @Component SearchBar 
 * Input field to filter customers
 * @param {Object} props
 * @param {string} value - Current input value
 * @param {function} onChange - Input chnage handler
 */
const SearchBar = ({ value, onChange }) => {
  return (
    <>
      <input
      className="search-input"
        type="text"
        placeholder="Search customer"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default SearchBar;