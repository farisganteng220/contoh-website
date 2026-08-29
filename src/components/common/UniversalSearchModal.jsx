import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useOS } from '../../context/OSContext';
import { useAudio } from '../../context/AudioContext';
import { siteConfig } from '../../config/siteConfig';
import { APP_REGISTRY } from '../desktop/AppLauncherModal';
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  Play,
  Image as ImageIcon,
  Film,
  Music as MusicIcon,
  Briefcase,
  Command,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';

/* ─────────────────────────────────────────
   Inline image lightbox (no external dep)
───────────────────────────────────────── */
const InlineLightbox = ({ src, onClose }) => {
  if (!src) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        zIndex: 19999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'var(--color-orange)',
          border: 'none',
          cursor: 'pointer',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(255, 156, 15, 0.4)',
        }}
      >
        <X size={20} />
      </button>
      <img
        src={src}
        alt="Preview"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '85vh',
          objectFit: 'contain',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      />
    </div>
  );
};

export const UniversalSearchModal = () => {
  const { searchModalOpen, setSearchModalOpen, openApp, isMobile } = useOS();
  const { playlist, selectTrack } = useAudio();

  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [activePreviewImage, setActivePreviewImage] = useState(null);
  const inputRef = useRef(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    } else {
      setQuery('');
      setActiveTab('all');
      setActivePreviewImage(null);
    }
  }, [searchModalOpen]);

  if (!searchModalOpen) return null;

  // 1. Apps Dataset
  const appsData = APP_REGISTRY.map(app => ({
    id: app.id,
    type: 'app',
    title: app.name,
    subtitle: app.category,
    desc: app.desc,
    icon: app.icon,
    color: app.color,
  }));

  // 2. Portfolio Dataset
  const portfolioData = (siteConfig.portfolioItems || []).map((item, i) => ({
    id: `port-${i}`,
    type: 'portfolio',
    title: item.title,
    subtitle: `${item.category} • ${item.year}`,
    desc: item.description,
    image: item.image,
    tags: item.tags || [],
  }));

  // 3. Music Dataset
  const musicData = (playlist || []).map((track, idx) => ({
    id: `music-${track.id || idx}`,
    trackIndex: idx,
    type: 'music',
    title: track.title,
    subtitle: `${track.artist} • ${track.album}`,
    desc: `Lo-Fi Soundscape (${track.duration})`,
    image: track.cover,
  }));

  // 4. Gallery & Images Dataset
  const imagesData = (siteConfig.galleryImages || []).map((img, i) => ({
    id: `img-${i}`,
    type: 'image',
    title: img.title,
    subtitle: `${img.category} (${img.size})`,
    desc: `Tags: ${(img.tags || []).join(', ')}`,
    image: img.image,
    tags: img.tags || [],
  }));

  // 5. Video Projects Dataset
  const videoData = (siteConfig.portfolioFiles || [])
    .filter(f => f.folder === 'Video Projects' || (f.type || '').includes('MP4') || (f.tags || []).includes('Video') || (f.tags || []).includes('Reels'))
    .map((vid, i) => ({
      id: `vid-${i}`,
      type: 'video',
      title: vid.name,
      subtitle: `${vid.folder} (${vid.size})`,
      desc: `Video motion graphics & editing reel • ${vid.modified}`,
      image: vid.preview,
    }));

  // Filter logic
  const q = query.trim().toLowerCase();
  const filterMatches = (items) => {
    if (!q) return items;
    return items.filter(item => {
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchSub = item.subtitle?.toLowerCase().includes(q);
      const matchDesc = item.desc?.toLowerCase().includes(q);
      const matchTags = item.tags ? item.tags.some(t => t.toLowerCase().includes(q)) : false;
      return matchTitle || matchSub || matchDesc || matchTags;
    });
  };

  const matchedApps = filterMatches(appsData);
  const matchedPortfolio = filterMatches(portfolioData);
  const matchedMusic = filterMatches(musicData);
  const matchedImages = filterMatches(imagesData);
  const matchedVideos = filterMatches(videoData);

  const totalResultsCount =
    (activeTab === 'all' || activeTab === 'apps' ? matchedApps.length : 0) +
    (activeTab === 'all' || activeTab === 'portfolio' ? matchedPortfolio.length : 0) +
    (activeTab === 'all' || activeTab === 'music' ? matchedMusic.length : 0) +
    (activeTab === 'all' || activeTab === 'images' ? matchedImages.length : 0) +
    (activeTab === 'all' || activeTab === 'videos' ? matchedVideos.length : 0);

  const handleSelectApp = (appId) => {
    openApp(appId);
    setSearchModalOpen(false);
  };

  const handleSelectMusic = (trackIndex) => {
    selectTrack(trackIndex);
    openApp('music');
    setSearchModalOpen(false);
  };

  const tabs = [
    { id: 'all',       label: 'Semua',     emoji: '✦',  count: matchedApps.length + matchedPortfolio.length + matchedMusic.length + matchedImages.length + matchedVideos.length },
    { id: 'apps',      label: 'Aplikasi',  emoji: '📱', count: matchedApps.length },
    { id: 'portfolio', label: 'Portofolio',emoji: '🎨', count: matchedPortfolio.length },
    { id: 'music',     label: 'Musik',     emoji: '🎵', count: matchedMusic.length },
    { id: 'images',    label: 'Gambar',    emoji: '🖼️', count: matchedImages.length },
    { id: 'videos',    label: 'Video',     emoji: '🎬', count: matchedVideos.length },
  ];

  const show = (tab) => activeTab === 'all' || activeTab === tab;

  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes searchZoomIn {
          0% {
            opacity: 0;
            transform: scale(0.78);
          }
          65% {
            opacity: 1;
            transform: scale(1.02);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={() => setSearchModalOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: isMobile ? 'rgba(0,0,0,0.68)' : 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '16px 12px' : '24px',
        }}
      >
        {/* Floating Window with Zoom In Animation */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: isMobile ? '100%' : '760px',
            maxWidth: isMobile ? '460px' : '94vw',
            maxHeight: isMobile ? '86vh' : '82vh',
            background: 'var(--bg-surface-elevated)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid var(--border-medium)',
            borderRadius: isMobile ? '22px' : '20px',
            boxShadow: isMobile
              ? '0 16px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,156,15,0.1)'
              : '0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,156,15,0.08)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'searchZoomIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          {/* Mobile top accent indicator */}
          {isMobile && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 2px' }}>
              <div style={{ width: '32px', height: '4px', background: 'var(--color-orange)', opacity: 0.7, borderRadius: '2px' }} />
            </div>
          )}

          {/* Desktop Window Title Bar */}
          {!isMobile && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 20px 10px',
              borderBottom: '1px solid var(--border-subtle)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '26px', height: '26px', borderRadius: '8px',
                  background: 'var(--color-orange)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff',
                }}>
                  <Search size={13} />
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Pencarian Universal OS
                </span>
                <span style={{
                  fontSize: '0.68rem', fontWeight: 700,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '4px',
                  padding: '1px 6px',
                  color: 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', gap: '3px',
                }}>
                  <Command size={9} />K
                </span>
              </div>
              <button
                onClick={() => setSearchModalOpen(false)}
                style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)',
                }}
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Search Input Bar */}
          <div style={{
            padding: isMobile ? '12px 16px' : '12px 20px',
            borderBottom: '1px solid var(--border-medium)',
            display: 'flex', alignItems: 'center', gap: '12px',
            background: 'var(--bg-surface)',
          }}>
            <Search size={18} style={{ color: 'var(--color-orange)', flexShrink: 0 }} />
            <input
              ref={inputRef}
              type="text"
              placeholder={isMobile ? 'Cari aplikasi, musik, portofolio...' : 'Cari aplikasi, fitur, proyek portofolio, musik, gambar, atau video...'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontSize: isMobile ? '1rem' : '1.05rem', fontWeight: 600,
                color: 'var(--text-primary)', fontFamily: 'var(--font-primary)',
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', background: 'none', border: 'none', display: 'flex', alignItems: 'center' }}
              >
                <X size={16} />
              </button>
            )}
            {isMobile ? (
              <button
                onClick={() => setSearchModalOpen(false)}
                style={{
                  fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-orange)',
                  background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-primary)',
                }}
              >
                Tutup
              </button>
            ) : (
              <button
                onClick={() => setSearchModalOpen(false)}
                style={{
                  padding: '5px 10px', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700,
                  background: 'var(--bg-surface)', border: '1px solid var(--border-medium)',
                  color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'var(--font-primary)',
                }}
              >
                ESC
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div style={{
            display: 'flex', gap: '6px',
            padding: '10px 16px',
            overflowX: 'auto', scrollbarWidth: 'none',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-card)',
            flexShrink: 0,
          }}>
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '5px 12px', borderRadius: '20px',
                    fontSize: '0.75rem', fontWeight: 700,
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    display: 'flex', alignItems: 'center', gap: '5px',
                    fontFamily: 'var(--font-primary)',
                    border: isActive ? '1px solid var(--color-orange)' : '1px solid var(--border-medium)',
                    background: isActive ? 'var(--color-orange)' : 'var(--bg-surface)',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{tab.emoji}</span>
                  <span>{tab.label}</span>
                  <span style={{
                    fontSize: '0.65rem',
                    background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--bg-card)',
                    padding: '1px 5px', borderRadius: '10px',
                  }}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results Body */}
          <div style={{
            flex: 1, overflowY: 'auto',
            padding: '16px',
            display: 'flex', flexDirection: 'column', gap: '20px',
            scrollbarWidth: 'thin',
          }}>
            {totalResultsCount === 0 ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                textAlign: 'center', padding: '48px 20px', gap: '10px',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'var(--bg-surface)', border: '1px solid var(--border-medium)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)',
                }}>
                  <Search size={28} />
                </div>
                <h3 style={{ fontSize: '1.05rem', margin: 0 }}>
                  {q ? `Tidak ada hasil untuk "${q}"` : 'Mulai mengetik untuk mencari...'}
                </h3>
                {q && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '280px', margin: 0 }}>
                    Coba kata kunci lain seperti nama aplikasi, desain, logo, lagu, atau video.
                  </p>
                )}
                {!q && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '6px' }}>
                    {['Portfolio', 'Music', 'Contact', 'LUTs Pack', 'Video'].map(hint => (
                      <button
                        key={hint}
                        onClick={() => setQuery(hint)}
                        style={{
                          fontSize: '0.75rem', fontWeight: 600, padding: '5px 12px',
                          borderRadius: '16px', background: 'var(--bg-card)',
                          border: '1px solid var(--border-medium)', color: 'var(--text-secondary)',
                          cursor: 'pointer',
                        }}
                      >
                        {hint}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* APLIKASI */}
                {show('apps') && matchedApps.length > 0 && (
                  <SearchSection label="📱 Aplikasi & Fitur OS" count={matchedApps.length}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '8px' }}>
                      {matchedApps.map(app => {
                        const Icon = app.icon;
                        return (
                          <SearchCard key={app.id} onClick={() => handleSelectApp(app.id)}>
                            <div style={{
                              width: '40px', height: '40px', borderRadius: '12px',
                              background: app.color,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: '#fff', flexShrink: 0,
                              boxShadow: `0 4px 12px ${app.color}40`,
                            }}>
                              <Icon size={18} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>{app.title}</span>
                                <span style={{
                                  fontSize: '0.62rem', fontWeight: 700,
                                  background: 'rgba(255,156,15,0.15)', color: 'var(--color-orange)',
                                  border: '1px solid rgba(255,156,15,0.3)', padding: '1px 5px', borderRadius: '6px',
                                }}>
                                  {app.subtitle}
                                </span>
                              </div>
                              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {app.desc}
                              </p>
                            </div>
                            <ChevronRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                          </SearchCard>
                        );
                      })}
                    </div>
                  </SearchSection>
                )}

                {/* PORTOFOLIO */}
                {show('portfolio') && matchedPortfolio.length > 0 && (
                  <SearchSection label="🎨 Proyek Portofolio" count={matchedPortfolio.length}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '8px' }}>
                      {matchedPortfolio.map(item => (
                        <SearchCard key={item.id} onClick={() => handleSelectApp('portfolio')}>
                          {item.image
                            ? <img src={item.image} alt={item.title} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                            : <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Briefcase size={20} /></div>
                          }
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 style={{ fontSize: '0.86rem', margin: '0 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h4>
                            <p style={{ fontSize: '0.72rem', color: 'var(--color-orange)', fontWeight: 600, margin: 0 }}>{item.subtitle}</p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.desc}</p>
                          </div>
                          <ChevronRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                        </SearchCard>
                      ))}
                    </div>
                  </SearchSection>
                )}

                {/* MUSIK */}
                {show('music') && matchedMusic.length > 0 && (
                  <SearchSection label="🎵 Musik & Soundscapes" count={matchedMusic.length}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      {matchedMusic.map(track => (
                        <SearchCard key={track.id} onClick={() => handleSelectMusic(track.trackIndex)}>
                          {track.image
                            ? <img src={track.image} alt={track.title} style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                            : <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MusicIcon size={20} /></div>
                          }
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 style={{ fontSize: '0.88rem', margin: '0 0 2px 0' }}>{track.title}</h4>
                            <p style={{ fontSize: '0.72rem', color: 'var(--color-orange)', fontWeight: 600, margin: 0 }}>{track.subtitle}</p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>{track.desc}</p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleSelectMusic(track.trackIndex); }}
                            style={{
                              width: '32px', height: '32px', borderRadius: '50%',
                              background: 'var(--color-orange)',
                              border: 'none', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: '#fff', flexShrink: 0,
                              boxShadow: 'var(--shadow-glow-orange)',
                            }}
                          >
                            <Play size={12} fill="#fff" />
                          </button>
                        </SearchCard>
                      ))}
                    </div>
                  </SearchSection>
                )}

                {/* GAMBAR */}
                {show('images') && matchedImages.length > 0 && (
                  <SearchSection label="🖼️ Gambar & Galeri" count={matchedImages.length}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(auto-fill, minmax(120px, 1fr))',
                      gap: '8px',
                    }}>
                      {matchedImages.map(img => (
                        <div
                          key={img.id}
                          onClick={() => setActivePreviewImage(img.image)}
                          style={{
                            borderRadius: '10px', overflow: 'hidden', cursor: 'pointer',
                            position: 'relative', aspectRatio: '1',
                            background: 'var(--bg-surface)', border: '1px solid var(--border-medium)',
                          }}
                        >
                          {img.image
                            ? <img src={img.image} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}><ImageIcon size={24} /></div>
                          }
                          <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            background: 'rgba(0,0,0,0.75)',
                            padding: '6px 6px 4px',
                          }}>
                            <p style={{ fontSize: '0.62rem', fontWeight: 700, color: '#fff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {img.title}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SearchSection>
                )}

                {/* VIDEO */}
                {show('videos') && matchedVideos.length > 0 && (
                  <SearchSection label="🎬 Proyek Video & Motion" count={matchedVideos.length}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '8px' }}>
                      {matchedVideos.map(vid => (
                        <SearchCard key={vid.id} onClick={() => vid.image && setActivePreviewImage(vid.image)}>
                          <div style={{ position: 'relative', width: '54px', height: '54px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: 'var(--bg-surface)' }}>
                            {vid.image && <img src={vid.image} alt={vid.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                              <Film size={18} />
                            </div>
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 style={{ fontSize: '0.86rem', margin: '0 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vid.title}</h4>
                            <p style={{ fontSize: '0.72rem', color: 'var(--color-orange)', margin: 0 }}>{vid.subtitle}</p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vid.desc}</p>
                          </div>
                        </SearchCard>
                      ))}
                    </div>
                  </SearchSection>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: '10px 16px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-card)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: '0.72rem', color: 'var(--text-muted)', flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={12} style={{ color: 'var(--color-orange)' }} />
              <span>Pencarian Universal · Aplikasi, Portofolio, Musik, Gambar &amp; Video</span>
            </div>
            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <kbd style={{ padding: '2px 5px', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: '4px', fontSize: '0.68rem', fontFamily: 'monospace' }}>ESC</kbd>
                <span>tutup</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inline image preview */}
      <InlineLightbox src={activePreviewImage} onClose={() => setActivePreviewImage(null)} />
    </>
  );
};

/* ── Sub-components ── */
const SearchSection = ({ label, count, children }) => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
      <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
        {label}
      </span>
      <span style={{
        fontSize: '0.62rem', fontWeight: 700,
        background: 'var(--bg-surface)', border: '1px solid var(--border-medium)',
        borderRadius: '10px', padding: '1px 6px', color: 'var(--text-muted)',
      }}>
        {count}
      </span>
    </div>
    {children}
  </div>
);

const SearchCard = ({ onClick, children }) => (
  <div
    onClick={onClick}
    style={{
      padding: '10px 12px', borderRadius: '12px',
      display: 'flex', alignItems: 'center', gap: '12px',
      cursor: 'pointer',
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      transition: 'all 0.15s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'var(--bg-card)';
      e.currentTarget.style.borderColor = 'rgba(255,156,15,0.5)';
      e.currentTarget.style.boxShadow = '0 2px 12px rgba(255,156,15,0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'var(--bg-surface)';
      e.currentTarget.style.borderColor = 'var(--border-subtle)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {children}
  </div>
);
