import React from 'react';
import StampCard from './StampCard';

export default function Gallery({ stamps, activeView, onSelectStamp }) {
    if (stamps.length === 0) {
        return (
            <main>
                <div id="no-results" style={{ display: 'block' }} aria-live="polite">
                    <span className="nr-icon">&#128269;</span>
                    <h3>No stamps found</h3>
                    <p>Try a different search term or category.</p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <section
                className={`gallery view-${activeView}`}
                id="gallery"
                aria-label="Stamp gallery"
            >
                {stamps.map((stamp, idx) => (
                    <StampCard
                        key={stamp.name}
                        stamp={stamp}
                        index={idx}
                        onClick={onSelectStamp}
                    />
                ))}
            </section>
        </main>
    );
}
