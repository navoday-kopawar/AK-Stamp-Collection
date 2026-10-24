import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES, SORT_OPTIONS, VIEW_OPTIONS } from '../data/stamps';

export default function ControlsBar({
    activeCategory,
    onCategoryChange,
    activeSort,
    onSortChange,
    activeView,
    onViewChange
}) {
    const [openDropdown, setOpenDropdown] = useState(null); // 'cat' | 'sort' | 'view' | null
    const containerRef = useRef(null);

    const toggle = (name) => {
        setOpenDropdown(prev => (prev === name ? null : name));
    };

    // Close on click outside or Escape
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpenDropdown(null);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const currentCat = CATEGORIES.find(c => c.key === activeCategory) || CATEGORIES[0];
    const currentSort = SORT_OPTIONS.find(s => s.key === activeSort) || SORT_OPTIONS[0];
    const currentView = VIEW_OPTIONS.find(v => v.key === activeView) || VIEW_OPTIONS[1]; // medium is index 1

    return (
        <div className="controls-bar" ref={containerRef}>
            {/* Category dropdown */}
            <div className="control-group cat-group">
                <button
                    className={`cat-select-btn ${openDropdown === 'cat' ? 'open' : ''}`}
                    id="cat-btn"
                    aria-haspopup="listbox"
                    aria-expanded={openDropdown === 'cat'}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggle('cat');
                    }}
                >
                    <span className="cat-select-icon">&#127988;</span>
                    <span className="cat-select-label" id="cat-btn-label">{currentCat.label}</span>
                    <span className="cat-select-chevron">&#9660;</span>
                </button>
                <div
                    className={`cat-dropdown ${openDropdown === 'cat' ? 'open' : ''}`}
                    id="cat-dropdown"
                    role="listbox"
                    aria-label="Filter by category"
                >
                    {CATEGORIES.map(cat => (
                        <div
                            key={cat.key}
                            className={`cat-opt ${activeCategory === cat.key ? 'active' : ''}`}
                            data-cat={cat.key}
                            role="option"
                            aria-selected={activeCategory === cat.key}
                            onClick={() => {
                                onCategoryChange(cat.key);
                                setOpenDropdown(null);
                            }}
                        >
                            <span className="cat-opt-dot"></span>
                            {cat.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right controls (Sort + View) */}
            <div className="controls-right">
                {/* Sort dropdown */}
                <div className="control-group sort-group">
                    <button
                        className={`sort-btn ${openDropdown === 'sort' ? 'open' : ''}`}
                        id="sort-btn"
                        aria-haspopup="listbox"
                        aria-expanded={openDropdown === 'sort'}
                        title="Sort stamps"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggle('sort');
                        }}
                    >
                        <span className="sort-icon">&#8645;</span>
                        <span className="sort-label" id="sort-btn-label">{currentSort.label}</span>
                        <span className="chevron">&#9660;</span>
                    </button>
                    <div
                        className={`sort-dropdown ${openDropdown === 'sort' ? 'open' : ''}`}
                        id="sort-dropdown"
                        role="listbox"
                        aria-label="Sort stamps"
                    >
                        {SORT_OPTIONS.map(opt => (
                            <div
                                key={opt.key}
                                className={`sort-opt ${activeSort === opt.key ? 'active' : ''}`}
                                data-sort={opt.key}
                                role="option"
                                aria-selected={activeSort === opt.key}
                                onClick={() => {
                                    onSortChange(opt.key);
                                    setOpenDropdown(null);
                                }}
                            >
                                {opt.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* View dropdown */}
                <div className="control-group view-group">
                    <button
                        className={`view-btn ${openDropdown === 'view' ? 'open' : ''}`}
                        id="view-btn"
                        aria-label="Layout view options"
                        title="Change layout view"
                        aria-haspopup="true"
                        aria-expanded={openDropdown === 'view'}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggle('view');
                        }}
                    >
                        <svg
                            id="view-btn-icon"
                            width="18"
                            height="18"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            dangerouslySetInnerHTML={{ __html: currentView.svg }}
                        />
                        <span className="chevron">&#9660;</span>
                    </button>
                    <div
                        className={`view-dropdown ${openDropdown === 'view' ? 'open' : ''}`}
                        id="view-dropdown"
                        role="menu"
                    >
                        {VIEW_OPTIONS.map((v, idx) => (
                            <React.Fragment key={v.key}>
                                {v.key === 'details' && <div className="vd-sep"></div>}
                                <div
                                    className={`vd-item ${activeView === v.key ? 'active' : ''}`}
                                    data-view={v.key}
                                    role="menuitem"
                                    onClick={() => {
                                        onViewChange(v.key);
                                        setOpenDropdown(null);
                                    }}
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        dangerouslySetInnerHTML={{ __html: v.svg }}
                                    />
                                    {v.label}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
