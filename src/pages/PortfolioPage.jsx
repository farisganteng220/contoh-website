import React, { useState, useMemo, useDeferredValue } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { Lightbox } from '../components/common/Lightbox';
import { InstagramIcon, YoutubeIcon, TikTokIcon } from '../components/common/BrandIcons';
import { useOS } from '../context/OSContext';
import { DecorativeBackground } from '../components/common/DecorativeBackground';
import {
  Briefcase,
  Search,
  ExternalLink,
  Palette,
  Eye,
  Sparkles,
  X,
} from 'lucide-react';

/* GridBackground and GeomDecor replaced by DecorativeBackground (imported above) */

/* ────────────────────────────────────────────
   SYMMETRICAL, ZERO-LAG SEARCH BAR COMPONENT
   (Responsive for Mobile, Tablet, and Desktop)
──────────────────────────────────────────── */
const PortfolioSearchBar = React.memo(({ searchTerm, setSearchTerm, isMobile }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        background: 'var(--bg-surface)',
        border: isFocused ? '1.5px solid var(--color-orange)' : '1.5px solid var(--border-medium)',
        borderRadius: '14px',
        padding: '0 14px',
        height: isMobile ? '46px' : '48px',
        boxShadow: isFocused
          ? '0 0 0 3px rgba(255,156,15,0.2), 0 4px 18px rgba(0,0,0,0.15)'
          : '0 2px 14px rgba(0,0,0,0.1)',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
      }}
    >
      {/* Symmetrical Left Icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          flexShrink: 0,
          color: isFocused ? 'var(--color-orange)' : 'var(--text-muted)',
          transition: 'color 0.2s ease',
        }}
      >
        <Search size={18} />
      </div>

      {/* Symmetrical Text Input */}
      <input
        type="text"
        placeholder="Cari karya, tools, atau kategori..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          fontSize: isMobile ? '0.88rem' : '0.9rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-primary)',
          minWidth: 0,
          padding: '0 12px',
          margin: 0,
          height: '100%',
          lineHeight: isMobile ? '46px' : '48px',
        }}
      />

      {/* Symmetrical Right Icon/Clear Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          flexShrink: 0,
        }}
      >
        {searchTerm ? (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            style={{
              color: 'var(--text-muted)',
              cursor: 'pointer',
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              padding: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.15s ease',
            }}
            title="Clear search"
          >
            <X size={14} />
          </button>
        ) : (
          <div style={{ width: '24px', height: '24px' }} />
        )}
      </div>
    </div>
  );
});

/* ────────────────────────────────────────────
   MAIN EXPORT
──────────────────────────────────────────── */
export const PortfolioPage = () => {
  const { isMobile } = useOS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightbox, setActiveLightbox] = useState(null);

  // Use deferred value for silky-smooth instantaneous keystrokes
  const deferredSearch = useDeferredValue(searchTerm);

  const categories = [
    'All',
    'Graphic Design',
    'Photo Editing',
    'Video Editing',
    'Branding',
    'Digital Content',
    'Other Projects',
  ];

  // Memoized search filtering for instantaneous zero-lag typing
  const filteredItems = useMemo(() => {
    const term = deferredSearch.trim().toLowerCase();
    return siteConfig.portfolioItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!term) return true;

      return (
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.tools.some((t) => t.toLowerCase().includes(term))
      );
    });
  }, [deferredSearch, selectedCategory]);

  return (
    <WindowFrame
      title="Portfolio Master Collection"
      icon={Briefcase}
      badgeText="Works & Showcases"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '20px' : '28px',
        }}
      >
        {/* HERO SECTION */}
        {isMobile ? (
          /* MOBILE HERO */
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              padding: '20px 16px 18px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              boxSizing: 'border-box',
              width: '100%',
            }}
          >
            <DecorativeBackground isMobile={true} scheme="mixed" />
            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Title Header */}
              <div style={{ marginBottom: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '6px',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '9px',
                      background: 'var(--color-orange)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 10px rgba(255, 156, 15, 0.4)',
                      flexShrink: 0,
                    }}
                  >
                    <Briefcase size={13} color="#fff" />
                  </div>
                  <span
                    style={{
                      fontSize: '0.66rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--color-orange)',
                    }}
                  >
                    Portfolio Master Collection
                  </span>
                </div>
                <h1
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 900,
                    margin: '0 0 6px',
                    lineHeight: 1.2,
                    color: 'var(--text-primary)',
                  }}
                >
                  Curated Works
                  <br />
                  <span style={{ color: 'var(--color-orange)' }}>&amp; Projects ✦</span>
                </h1>
                <p
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Desain grafis, video cinematic, visual identity &amp; kreasi
                  digital interaktif.
                </p>
              </div>

              {/* Symmetrical Mobile Search Bar */}
              <div style={{ width: '100%', marginBottom: '14px' }}>
                <PortfolioSearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  isMobile={true}
                />
              </div>

              {/* Stats Strip */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { val: filteredItems.length, label: 'Karya Ditemukan' },
                  { val: categories.length - 1, label: 'Kategori' },
                  { val: '2+', label: 'Tahun Karya' },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '8px 4px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 900,
                        color: 'var(--color-orange)',
                      }}
                    >
                      {s.val}
                    </div>
                    <div
                      style={{
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        lineHeight: 1.3,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* DESKTOP & TABLET HERO */
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              padding: '28px 32px',
              boxShadow: '0 4px 28px rgba(0,0,0,0.12)',
              boxSizing: 'border-box',
              width: '100%',
            }}
          >
            <DecorativeBackground isMobile={false} scheme="mixed" />
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '24px',
              }}
            >
              {/* Left Column: Heading and Info */}
              <div style={{ flex: '1 1 360px', minWidth: '280px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px',
                  }}
                >
                  <Sparkles size={15} style={{ color: 'var(--color-orange)' }} />
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--color-orange)',
                    }}
                  >
                    Portfolio Master Collection
                  </span>
                </div>
                <h1
                  style={{
                    fontSize: '2.1rem',
                    fontWeight: 900,
                    margin: '0 0 8px',
                    lineHeight: 1.15,
                  }}
                >
                  Curated{' '}
                  <span className="text-gradient">Portfolio &amp; Projects</span>
                </h1>
                <p
                  style={{
                    maxWidth: '560px',
                    margin: 0,
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                  }}
                >
                  Eksplorasi karya desain grafis, editing video cinematic, visual
                  identity, dan kreasi digital interaktif.
                </p>
              </div>

              {/* Right Column: Symmetrical Desktop/Tablet Search Bar */}
              <div
                style={{
                  flex: '1 1 320px',
                  maxWidth: '420px',
                  minWidth: '260px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <PortfolioSearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  isMobile={false}
                />
              </div>
            </div>
          </div>
        )}

        {/* Category Pills */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            paddingBottom: '4px',
            flexWrap: 'nowrap',
          }}
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: isMobile ? '7px 14px' : '7px 16px',
                  borderRadius: '20px',
                  fontSize: isMobile ? '0.74rem' : '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-primary)',
                  flexShrink: 0,
                  border: active
                    ? '1px solid var(--color-orange)'
                    : '1px solid var(--border-medium)',
                  background: active
                    ? 'var(--color-orange)'
                    : 'var(--bg-surface)',
                  color: active ? '#fff' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease',
                  boxShadow: active ? '0 4px 12px rgba(255, 156, 15, 0.35)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? '1fr'
              : 'repeat(auto-fill,minmax(300px,1fr))',
            gap: isMobile ? '16px' : '24px',
          }}
        >
          {filteredItems.length === 0 ? (
            <div
              style={{
                gridColumn: '1/-1',
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--text-muted)',
              }}
            >
              <Search
                size={36}
                style={{ margin: '0 auto 12px', opacity: 0.4, display: 'block' }}
              />
              <p style={{ fontWeight: 600, margin: 0 }}>
                Tidak ada karya yang cocok dengan pencarianmu.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="glass-card hover-lift"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  padding: isMobile ? '12px' : '16px',
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: isMobile ? '180px' : '210px',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    marginBottom: '14px',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="hover-scale"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform var(--transition-normal)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top,rgba(0,0,0,0.45) 0%,transparent 55%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      display: 'flex',
                      gap: '5px',
                    }}
                  >
                    <span
                      className="badge badge-orange"
                      style={{ fontSize: '0.65rem' }}
                    >
                      {item.category}
                    </span>
                    <span
                      className="badge badge-glass"
                      style={{ fontSize: '0.65rem' }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveLightbox(item)}
                    className="btn btn-primary-orange btn-sm"
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      padding: '5px 11px',
                      fontSize: '0.74rem',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                    }}
                  >
                    <Eye size={13} />
                    <span>Preview</span>
                  </button>
                </div>
                {/* Content */}
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: isMobile ? '1rem' : '1.1rem',
                        marginBottom: '6px',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '12px',
                        lineHeight: 1.5,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '5px',
                        marginBottom: '12px',
                      }}
                    >
                      {item.tools.map((t, i) => (
                        <span
                          key={i}
                          className="badge badge-glass"
                          style={{ fontSize: '0.67rem' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid var(--border-medium)',
                        paddingTop: '10px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.74rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        Client:{' '}
                        <strong style={{ color: 'var(--text-primary)' }}>
                          {item.client}
                        </strong>
                      </span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-glass btn-sm"
                        style={{ fontSize: '0.74rem' }}
                      >
                        <span>View</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Social Media Portfolio */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px',
            }}
          >
            <Sparkles size={17} className="text-orange" />
            <h2 style={{ fontSize: isMobile ? '1.15rem' : '1.35rem', margin: 0 }}>
              Social Media Portfolio
            </h2>
          </div>
          <p
            style={{
              marginBottom: '14px',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
            }}
          >
            Lihat karya kreatif, tutorial workflow, motion design, dan video
            reels terbaru melalui platform media sosial resmi kami.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? '1fr'
                : 'repeat(auto-fit,minmax(230px,1fr))',
              gap: '12px',
            }}
          >
            {[
              {
                href: siteConfig.socials.instagram.url,
                grad: '#E1306C',
                shadow: 'rgba(225,48,108,0.25)',
                icon: <InstagramIcon size={21} color="#fff" />,
                label: 'Instagram Showcase',
                handle: siteConfig.socials.instagram.handle,
                badge: 'Visit Instagram ↗',
                cls: 'badge-orange',
              },
              {
                href: siteConfig.socials.tiktok.url,
                grad: '#000000',
                shadow: 'rgba(0,0,0,0.3)',
                icon: <TikTokIcon size={21} color="#fff" />,
                label: 'TikTok Reels',
                handle: siteConfig.socials.tiktok.handle,
                badge: 'Watch TikTok ↗',
                cls: 'badge-blue',
              },
              {
                href: siteConfig.socials.youtube.url,
                grad: '#FF0000',
                shadow: 'rgba(255,0,0,0.25)',
                icon: <YoutubeIcon size={21} color="#fff" />,
                label: 'YouTube Channel',
                handle: siteConfig.socials.youtube.handle,
                badge: 'Watch Tutorials ↗',
                cls: 'badge-orange',
              },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card hover-lift"
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  borderRadius: 'var(--radius-xl)',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '13px',
                    background: s.grad,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: `0 6px 16px ${s.shadow}`,
                  }}
                >
                  {s.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.92rem', margin: 0 }}>{s.label}</h4>
                  <p
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      margin: '2px 0 6px 0',
                    }}
                  >
                    {s.handle}
                  </p>
                  <span className={`badge ${s.cls}`} style={{ fontSize: '0.63rem' }}>
                    {s.badge}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* External Portfolio Hubs */}
        <div style={{ marginBottom: isMobile ? '20px' : '4px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px',
            }}
          >
            <Palette size={17} className="text-blue" />
            <h2 style={{ fontSize: isMobile ? '1.15rem' : '1.35rem', margin: 0 }}>
              External Portfolio Hubs
            </h2>
          </div>
          <p
            style={{
              marginBottom: '14px',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
            }}
          >
            Akses portofolio lengkap dan case studies di berbagai platform industri
            desain global.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? '1fr'
                : 'repeat(auto-fit,minmax(230px,1fr))',
              gap: '12px',
            }}
          >
            {siteConfig.externalPortfolios.map((ext) => (
              <div
                key={ext.id}
                className="glass-card hover-lift"
                style={{
                  padding: '18px',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      className="badge"
                      style={{
                        background: `${ext.accent}20`,
                        color: ext.accent,
                        fontSize: '0.67rem',
                      }}
                    >
                      {ext.tag}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>↗</span>
                  </div>
                  <h4 style={{ fontSize: '0.98rem', marginBottom: '5px' }}>
                    {ext.platform}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    {ext.description}
                  </p>
                </div>
                <a
                  href={ext.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-glass btn-sm"
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <span>Visit Portfolio</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {activeLightbox && (
        <Lightbox
          isOpen={Boolean(activeLightbox)}
          image={activeLightbox.image}
          title={activeLightbox.title}
          caption={`${activeLightbox.category} • ${activeLightbox.year} • Tools: ${activeLightbox.tools.join(', ')}`}
          onClose={() => setActiveLightbox(null)}
        />
      )}
    </WindowFrame>
  );
};
