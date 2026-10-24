import React, { useEffect, useRef } from 'react';

export default function Lightbox({ stamp, onClose }) {
    const closeBtnRef = useRef(null);

    useEffect(() => {
        if (!stamp) return;

        // Lock background scrolling
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // Focus close button for accessibility
        if (closeBtnRef.current) {
            closeBtnRef.current.focus();
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = prevOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [stamp, onClose]);

    if (!stamp) return null;

    const origSrc = `assets/${encodeURIComponent(stamp.file)}`;
    const webpThumb = `assets/thumbnails/${stamp.file.replace(/\.png$/, '.webp')}`;

    return (
        <div id="lightbox" className="open" role="dialog" aria-modal="true" aria-label="Stamp detail">
            <div className="lb-backdrop" id="lb-backdrop" onClick={onClose}></div>
            <div className="lb-card" id="lb-card">
                <button
                    ref={closeBtnRef}
                    className="lb-close"
                    id="lb-close"
                    aria-label="Close"
                    onClick={onClose}
                >
                    &#10005;
                </button>

                <div className="lb-img-container">
                    <img
                        id="lb-img"
                        src={origSrc}
                        alt={stamp.name}
                        onError={(e) => {
                            // Fallback to webp thumb if orig fails
                            e.target.src = webpThumb;
                        }}
                    />
                </div>

                <div className="lb-info">
                    <h2 id="lb-name">{stamp.name}</h2>
                    <div className="lb-meta">
                        <span className="stamp-category" id="lb-cat">{stamp.cat}</span>
                        <span className="stamp-denomination" id="lb-denom">{stamp.denom}</span>
                    </div>

                    <div className="lb-body" id="lb-body">
                        {stamp.desc && (
                            <p className="lb-desc">{stamp.desc}</p>
                        )}

                        {stamp.history && (
                            <div className="lb-section">
                                <h4 className="lb-section-title">
                                    <span className="lb-section-icon">&#128220;</span> Historical Background
                                </h4>
                                <p className="lb-history-text">{stamp.history}</p>
                            </div>
                        )}

                        {stamp.specs && (
                            <div className="lb-section">
                                <h4 className="lb-section-title">
                                    <span className="lb-section-icon">&#128394;</span> Philatelic Specifications
                                </h4>
                                <div className="lb-specs-grid">
                                    {stamp.specs.series && (
                                        <div className="lb-spec-row">
                                            <span className="lb-spec-key">Series</span>
                                            <span className="lb-spec-val">{stamp.specs.series}</span>
                                        </div>
                                    )}
                                    {stamp.specs.issueDate && (
                                        <div className="lb-spec-row">
                                            <span className="lb-spec-key">Issue Date</span>
                                            <span className="lb-spec-val">{stamp.specs.issueDate}</span>
                                        </div>
                                    )}
                                    {stamp.specs.faceValue && (
                                        <div className="lb-spec-row">
                                            <span className="lb-spec-key">Face Value</span>
                                            <span className="lb-spec-val">{stamp.specs.faceValue}</span>
                                        </div>
                                    )}
                                    {stamp.specs.catalogDenom && (
                                        <div className="lb-spec-row">
                                            <span className="lb-spec-key">Denomination</span>
                                            <span className="lb-spec-val">{stamp.specs.catalogDenom}</span>
                                        </div>
                                    )}
                                    {stamp.specs.printing && (
                                        <div className="lb-spec-row">
                                            <span className="lb-spec-key">Printing / Paper</span>
                                            <span className="lb-spec-val">{stamp.specs.printing}</span>
                                        </div>
                                    )}
                                    {stamp.specs.perforation && (
                                        <div className="lb-spec-row">
                                            <span className="lb-spec-key">Perforation</span>
                                            <span className="lb-spec-val">{stamp.specs.perforation}</span>
                                        </div>
                                    )}
                                    {stamp.specs.printer && (
                                        <div className="lb-spec-row">
                                            <span className="lb-spec-key">Security Printer</span>
                                            <span className="lb-spec-val">{stamp.specs.printer}</span>
                                        </div>
                                    )}
                                </div>

                                {stamp.specs.verifiedNote && (
                                    <div className="lb-section lb-verified-box" style={{ marginTop: '16px' }}>
                                        <div className="lb-verified-header">
                                            <span className="lb-verified-icon">&#9989;</span>
                                            <span className="lb-verified-title">Authentication &amp; Catalog Verification</span>
                                        </div>
                                        <p className="lb-verified-text">{stamp.specs.verifiedNote}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
