import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  Sparkles,
  Check,
  Star,
  Download,
  ExternalLink,
  ShieldCheck,
  Zap,
  Info,
  X,
  CreditCard,
} from 'lucide-react';

export const PremiumAppsPage = () => {
  const { addToast, isMobile } = useOS();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalApp, setActiveModalApp] = useState(null);

  const categories = ['All', 'Productivity', 'Editing', 'Premium Tools', 'Utility', 'Other Apps'];

  const filteredApps = siteConfig.premiumApps.filter(app => {
    return selectedCategory === 'All' || app.category === selectedCategory;
  });

  const handleBuyClick = (app) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    addToast('Direct Checkout', `Mengalihkan pesanan untuk ${app.name}...`, 'success');
    window.open(app.buyUrl, '_blank');
  };

  return (
    <WindowFrame title="Premium Apps Store" icon={ShoppingBag} badgeText="Marketplace v4.0">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Header Banner */}
        <div
          className="glass-card"
          style={{
            padding: '28px 32px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-orange" style={{ fontSize: isMobile ? '0.65rem' : '0.72rem' }}>Official Digital Store</span>
              <span className="badge badge-blue" style={{ fontSize: isMobile ? '0.65rem' : '0.72rem' }}>Instant Delivery</span>
            </div>
            <h1 style={{ fontSize: isMobile ? '1.3rem' : '1.85rem', marginBottom: '6px', lineHeight: '1.2' }}>
              Vantara <span className="text-gradient">Premium Applications & Tools</span>
            </h1>
            <p style={{ maxWidth: '620px', margin: 0 }}>
              Koleksi software utility, extension panel After Effects/Premiere Pro, sound packs, dan design automation tools yang dibuat untuk mempercepat alur kerja kreatif Anda.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-orange)' }}>
                100% Lifetime
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Free Updates & Support</div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="filter-pills">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Apps Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: isMobile ? '16px' : '24px',
          }}
        >
          {filteredApps.map(app => (
            <div
              key={app.id}
              className="glass-card hover-lift"
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px',
              }}
            >
              <div>
                {/* Thumbnail & Badges */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '180px',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    marginBottom: '16px',
                  }}
                >
                  <img
                    src={app.thumbnail}
                    alt={app.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      gap: '6px',
                    }}
                  >
                    <span className="badge" style={{ background: app.badgeColor, color: '#fff' }}>
                      {app.badge}
                    </span>
                    <span className="badge badge-glass">{app.category}</span>
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(4, 2, 0, 0.85)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#fff',
                    }}
                  >
                    ⭐ {app.rating} ({app.downloads})
                  </div>
                </div>

                {/* App Name & Pricing */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{app.name}</h3>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-orange)' }}>
                      {app.price}
                    </div>
                    {app.originalPrice && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        {app.originalPrice}
                      </div>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                  {app.description}
                </p>

                {/* Features Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {app.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
                      <Check size={15} className="text-orange" />
                      <span style={{ color: 'var(--text-primary)' }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid var(--border-medium)', paddingTop: '16px' }}>
                <button
                  onClick={() => handleBuyClick(app)}
                  className="btn btn-primary-orange btn-sm"
                  style={{ flex: 1 }}
                >
                  <CreditCard size={15} />
                  <span>Buy Now</span>
                </button>
                <button
                  onClick={() => setActiveModalApp(app)}
                  className="btn btn-glass btn-sm"
                  style={{ flex: 1 }}
                >
                  <Info size={15} />
                  <span>More Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* App Details Modal */}
      {activeModalApp && (
        <div
          className="animate-fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(16px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalApp(null);
          }}
        >
          <div
            className="animate-scale-in"
            style={{
              width: '90vw',
              maxWidth: '600px',
              background: 'var(--bg-surface-elevated)',
              backdropFilter: 'blur(30px)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              padding: '28px',
              boxShadow: 'var(--shadow-dock)',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-orange">{activeModalApp.badge}</span>
                <span className="badge badge-glass">{activeModalApp.status}</span>
              </div>
              <button
                onClick={() => setActiveModalApp(null)}
                style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src={activeModalApp.thumbnail}
                alt={activeModalApp.name}
                style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-lg)', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ fontSize: '1.35rem', margin: 0 }}>{activeModalApp.name}</h3>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-orange)', marginTop: '4px' }}>
                  {activeModalApp.price}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {activeModalApp.description}
            </p>

            <div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '10px' }}>Fitur & Keunggulan Lengkap:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activeModalApp.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem' }}>
                    <Check size={16} className="text-orange" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={() => {
                  handleBuyClick(activeModalApp);
                  setActiveModalApp(null);
                }}
                className="btn btn-primary-orange"
                style={{ flex: 1 }}
              >
                <Zap size={16} />
                <span>Order via WhatsApp ({activeModalApp.price})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </WindowFrame>
  );
};
