import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ControlsBar from './components/ControlsBar';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';
import { STAMPS } from './data/stamps';

export default function App() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchInput, setSearchInput] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [activeSort, setActiveSort] = useState('name-asc');
    const [activeView, setActiveView] = useState('medium');
    const [selectedStamp, setSelectedStamp] = useState(null);

    // Debounce search input for high performance
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchInput.trim().toLowerCase());
        }, 150);
        return () => clearTimeout(handler);
    }, [searchInput]);

    // Filter and sort items efficiently with useMemo
    const filteredStamps = useMemo(() => {
        const q = debouncedQuery;
        const matches = STAMPS.filter(s => {
            const matchCat = activeCategory === 'all' || s.cat === activeCategory;
            const matchSrch = !q ||
                s.name.toLowerCase().includes(q) ||
                s.cat.toLowerCase().includes(q) ||
                s.denom.toLowerCase().includes(q) ||
                (s.desc && s.desc.toLowerCase().includes(q)) ||
                (s.history && s.history.toLowerCase().includes(q)) ||
                (s.specs && JSON.stringify(s.specs).toLowerCase().includes(q));
            return matchCat && matchSrch;
        });

        return matches.sort((a, b) => {
            if (activeSort === 'name-asc') {
                return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
            } else if (activeSort === 'name-desc') {
                return b.name.localeCompare(a.name, undefined, { sensitivity: 'base' });
            } else if (activeSort === 'category') {
                return a.cat.localeCompare(b.cat, undefined, { sensitivity: 'base' });
            } else if (activeSort === 'denom') {
                return a.denom.localeCompare(b.denom, undefined, { sensitivity: 'base' });
            }
            return 0;
        });
    }, [activeCategory, debouncedQuery, activeSort]);

    return (
        <div className="app-root">
            <Header />

            <SearchBar
                searchQuery={searchInput}
                onSearchChange={setSearchInput}
                onSearchClear={() => {
                    setSearchInput('');
                    setDebouncedQuery('');
                }}
                matchCount={filteredStamps.length}
            />

            <ControlsBar
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                activeSort={activeSort}
                onSortChange={setActiveSort}
                activeView={activeView}
                onViewChange={setActiveView}
            />

            <Gallery
                stamps={filteredStamps}
                activeView={activeView}
                onSelectStamp={setSelectedStamp}
            />

            <Lightbox
                stamp={selectedStamp}
                onClose={() => setSelectedStamp(null)}
            />

            <Footer />

            <ScrollTop />
        </div>
    );
}
