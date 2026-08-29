import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { useOS } from '../context/OSContext';
import { DecorativeBackground } from '../components/common/DecorativeBackground';
import { ClockWidget } from '../components/desktop/ClockWidget';
import { CalendarWidget } from '../components/desktop/CalendarWidget';
import { NotesWidget } from '../components/desktop/NotesWidget';
import { PixelAtAGlance } from '../components/mobile/PixelAtAGlance';
import { GoogleSearchPill } from '../components/mobile/GoogleSearchPill';
import { AndroidAppGrid } from '../components/mobile/AndroidAppGrid';
import { ThemeToggle } from '../components/common/ThemeToggle';
import {
  Briefcase,
  Sparkles,
  ArrowRight,
  Send,
  MessageSquare,
  Flame,
  Layers,
  ChevronRight,
  Star,
  ExternalLink,
  ShoppingBag,
  Search,
} from 'lucide-react';

export const HomePage = () => {
  const { isMobile, openApp, setSearchModalOpen } = useOS();

  if (isMobile) {
    return (
      <div className="mobile-home-container animate-fade-in" style={{ position: 'relative' }}>
        <DecorativeBackground variant="subtle" scheme="mixed" cols={6} rows={8} opacity={0.6} />
        <PixelAtAGlance />

        {/* Hero Clock & Profile Pill */}
        <div className="android-clock-hero">
          <div className="android-clock-digits">
            {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="android-creator-badge">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
            <span>{siteConfig.profile.name} • {siteConfig.profile.brandName}</span>
          </div>
        </div>

        {/* Google Search Pill */}
        <GoogleSearchPill />

        {/* Android App Grid */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ padding: '0 20px 10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
              Applications & Hubs
            </span>
            <span className="badge badge-orange" style={{ fontSize: '0.65rem' }}>Android 16 QPR2</span>
          </div>
          <AndroidAppGrid />
        </div>

        {/* Quick Highlights Carousel / Card */}
        <div style={{ padding: '0 16px', marginBottom: '24px' }}>
          <div className="glass-card" style={{ padding: '18px', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Sparkles size={18} className="text-orange" />
              <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Welcome to My Digital Space</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              {siteConfig.profile.shortBio}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => openApp('portfolio')}
                className="btn btn-primary-orange btn-sm"
                style={{ flex: 1 }}
              >
                Explore Works
              </button>
              <button
                onClick={() => openApp('commission')}
                className="btn btn-glass btn-sm"
                style={{ flex: 1 }}
              >
                Commission
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop OS Dashboard Layout (FydeOS / ChromeOS Flex)
  return (
    <div className="desktop-workspace animate-fade-in" style={{ position: 'relative' }}>
      <DecorativeBackground variant="subtle" scheme="mixed" cols={12} rows={8} opacity={0.55} />
      {/* Top Header Status & Greeting */}
      <div className="desktop-top-bar">
        <div className="desktop-brand-tag">
          <div className="os-logo-badge">V</div>
          <div>
            <h2 className="desktop-brand-title">{siteConfig.profile.brandName}</h2>
            <p className="desktop-brand-subtitle">
              FydeOS / ChromeOS Flex Edition • {siteConfig.profile.name}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 auto', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          {/* Universal Search Bar Trigger */}
          <div
            onClick={() => setSearchModalOpen(true)}
            className="search-bar btn-press"
            style={{
              padding: '8px 16px',
              flex: '1 1 200px',
              maxWidth: '340px',
              minWidth: '180px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={15} className="text-orange" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Cari fitur & portofolio...</span>
            </div>
            <kbd style={{ padding: '2px 6px', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: '4px', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              Ctrl K
            </kbd>
          </div>

          <ThemeToggle />
          <button
            onClick={() => openApp('contact')}
            className="btn btn-primary-blue btn-sm hover-lift"
          >
            <Send size={15} />
            <span>Contact Me</span>
          </button>
        </div>
      </div>

      {/* Main OS Widgets Grid (Clock, Calendar, Notes) */}
      <div className="desktop-widgets-grid">
        <ClockWidget />

        {/* Creator Hero Card */}
        <div
          className="os-widget creator-hero-widget hover-lift"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'var(--bg-surface)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={siteConfig.profile.avatar}
                  alt={siteConfig.profile.name}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--color-orange)',
                    boxShadow: '0 4px 16px rgba(255, 156, 15, 0.3)',
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{siteConfig.profile.name}</h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--color-orange)', fontWeight: 600, margin: 0 }}>
                    {siteConfig.profile.role}
                  </p>
                </div>
              </div>
              <span className="badge badge-orange">
                <Star size={12} fill="currentColor" />
                {siteConfig.profile.rating} Rating
              </span>
            </div>

            <h2 style={{ fontSize: '1.45rem', marginBottom: '8px', lineHeight: 1.25 }}>
              “Welcome to My <span className="text-gradient">Digital Space</span>”
            </h2>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '18px', maxWidth: '620px', lineHeight: 1.55 }}>
              {siteConfig.profile.shortBio}
            </p>
          </div>

          {/* Quick Action Buttons & Stats */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid var(--border-medium)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {siteConfig.profile.projectsCompleted}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Projects</span>
              </div>
              <div>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-orange)' }}>
                  {siteConfig.profile.experienceYears}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Experience</span>
              </div>
              <div>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-blue)' }}>
                  {siteConfig.profile.happyClients}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Happy Clients</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => openApp('portfolio')}
                className="btn btn-primary-orange btn-sm hover-lift"
              >
                <Briefcase size={15} />
                <span>Explore Portfolio</span>
              </button>
              <button
                onClick={() => openApp('apps')}
                className="btn btn-glass btn-sm hover-lift"
              >
                <ShoppingBag size={15} />
                <span>Premium Apps</span>
              </button>
            </div>
          </div>
        </div>

        <CalendarWidget />
      </div>

      {/* Second Row: Notes & Quick App Groups */}
      <div className="desktop-secondary-grid">
        <NotesWidget />

        {/* Recently Added Portfolio / Quick Applications */}
        <div className="os-widget hover-lift">
          <div className="os-widget-header">
            <span className="os-widget-title">
              <Flame size={16} className="text-orange" />
              Recently Added Portfolio & Tools
            </span>
            <button
              onClick={() => openApp('portfolio')}
              className="btn-glass btn-sm"
              style={{ fontSize: '0.76rem', cursor: 'pointer', padding: '4px 10px', borderRadius: 'var(--radius-pill)' }}
            >
              View All ↗
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            {siteConfig.portfolioItems.slice(0, 3).map(item => (
              <div
                key={item.id}
                onClick={() => openApp('portfolio')}
                className="glass-card btn-press"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: '10px',
                }}
              >
                <div
                  style={{
                    height: '110px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    marginBottom: '10px',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span className="badge badge-orange" style={{ fontSize: '0.66rem' }}>{item.category}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.year}</span>
                </div>
                <h4 style={{ fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
