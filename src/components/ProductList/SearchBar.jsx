import React from "react";
import "./SearchBar.scss";

const SearchBar = ({ value, onChange }) => {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="search-bar">
      <svg
        className="search-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input
        type="text"
        className="search-input"
        placeholder="Search products by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className="clear-btn"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
