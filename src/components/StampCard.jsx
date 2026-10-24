import React from 'react';

export default function StampCard({ stamp, index, onClick }) {
    const webpSrc = `assets/thumbnails/${stamp.file.replace(/\.png$/, '.webp')}`;
    const origSrc = `assets/${encodeURIComponent(stamp.file)}`;
    const descPreview = stamp.desc
        ? stamp.desc.slice(0, 110) + (stamp.desc.length > 110 ? '\u2026' : '')
        : '';

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(stamp);
        }
    };

    return (
        <article
            className="card"
            style={{ animationDelay: `${index * 35}ms` }}
            tabIndex={0}
            role="button"
            aria-label={`${stamp.name} stamp`}
            onClick={() => onClick(stamp)}
            onKeyDown={handleKeyDown}
        >
            <div className="stamp-body">
                <div className="perfs-top"></div>
                <div className="perfs-left"></div>
                <div className="perfs-right"></div>

                <div className="stamp-img-wrap">
                    <img
                        loading="lazy"
                        decoding="async"
                        src={webpSrc}
                        alt={`${stamp.name} Indian Stamp`}
                        onError={(e) => {
                            if (!e.target.dataset.triedOriginal) {
                                e.target.dataset.triedOriginal = 'true';
                                e.target.src = origSrc;
                            } else {
                                e.target.style.minHeight = '180px';
                                e.target.style.background = '#e8dfc8';
                            }
                        }}
                    />
                </div>

                <div className="stamp-info">
                    <h3 className="stamp-name">{stamp.name}</h3>
                    <div className="stamp-meta">
                        <span className="stamp-category">{stamp.cat}</span>
                        <span className="stamp-denomination">{stamp.denom}</span>
                    </div>
                </div>

                {descPreview && (
                    <div className="stamp-desc-preview">{descPreview}</div>
                )}

                <div className="perfs-bottom"></div>
            </div>
        </article>
    );
}
