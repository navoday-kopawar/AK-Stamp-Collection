import React from 'react';

export default function Header() {
    return (
        <header id="top">
            <div className="logo-wrap">
                <div className="logo-ring">
                    <div className="logo-inner">
                        <img
                            src="assets/thumbnails/logo.webp"
                            onError={(e) => {
                                // Fallback to original png if webp not available
                                if (!e.target.dataset.triedOriginal) {
                                    e.target.dataset.triedOriginal = 'true';
                                    e.target.src = 'assets/logo.png';
                                } else {
                                    e.target.parentElement.style.background = 'linear-gradient(135deg,#3d1f00 0%,#8b3a1a 100%)';
                                    e.target.style.display = 'none';
                                }
                            }}
                            alt="AK Stamp Collection Logo"
                            id="logo-img"
                        />
                    </div>
                </div>
            </div>
            <div className="brand-badge">Est. Philatelic Treasury</div>
            <h1><span>AK</span> Stamp Collection</h1>
            <p className="tagline">A curated treasury of India's rarest postal heritage</p>
            <div className="ornament">
                <div className="ornament-line"></div>
                <span className="ornament-diamond">&#9670;</span>
                <div className="ornament-line"></div>
            </div>
        </header>
    );
}
