import React, { useRef } from 'react';

export default function SearchBar({ searchQuery, onSearchChange, onSearchClear, matchCount }) {
    const inputRef = useRef(null);

    const handleClear = () => {
        onSearchClear();
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="search-wrap">
            <div className="search-inner">
                <span className="search-icon">&#128269;</span>
                <input
                    ref={inputRef}
                    type="search"
                    id="search"
                    placeholder="Search by name, category..."
                    autoComplete="off"
                    aria-label="Search stamps"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <div className="search-trailing" id="search-trailing">
                    <span className="search-count" id="search-count">
                        {searchQuery.trim() ? `${matchCount} found` : ''}
                    </span>
                    <button
                        type="button"
                        className={`search-clear-btn ${searchQuery.length > 0 ? 'visible' : ''}`}
                        id="search-clear"
                        aria-label="Clear search"
                        title="Clear search"
                        onClick={handleClear}
                    >
                        &#10005;
                    </button>
                </div>
            </div>
        </div>
    );
}
