import React from 'react';
import './ViewToggle.scss';

const ViewToggle = ({ viewMode, onChange }) => {
  return (
    <div className="view-toggle">
      <button
        className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
        onClick={() => onChange('list')}
        aria-label="List View"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
        <span>List</span>
      </button>
      <button
        className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
        onClick={() => onChange('card')}
        aria-label="Card View"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <span>Card</span>
      </button>
    </div>
  );
};

export default ViewToggle;
