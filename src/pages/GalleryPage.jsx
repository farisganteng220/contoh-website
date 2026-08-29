import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { Lightbox } from '../components/common/Lightbox';
import { useOS } from '../context/OSContext';
import {
  Image as ImageIcon,
  Eye,
  Camera,
  Calendar,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';

export const GalleryPage = () => {
  const { isMobile } = useOS();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLightbox, setActiveLightbox] = useState(null);

  const categories = [
    'All',
    'Creative Artwork',
    'Photo Collection',
    'Behind The Scenes',
    'Project Preview',
  ];

  const filteredGallery = siteConfig.galleryItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.camera.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <WindowFrame title="Visual Gallery & Artworks" icon={ImageIcon} badgeText="Creative Shots">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Header & Filter Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: isMobile ? '1.3rem' : '1.85rem', marginBottom: '6px', lineHeight: '1.2' }}>
                Creative <span className="text-gradient">Gallery & Visual Archive</span>
              </h1>
              <p style={{ maxWidth: '620px', margin: 0 }}>
                Koleksi karya seni 3D, behind-the-scenes studio setup, manipulasi foto malam sinematik, dan snapshot prototipe visual OS.
              </p>
            </div>

            <div className="search-bar" style={{ maxWidth: '300px' }}>
              <Search size={18} className="text-orange" />
              <input
                type="text"
                placeholder="Cari foto, artwork, alat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

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
        </div>

        {/* Masonry / Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: isMobile ? '16px' : '20px',
          }}
        >
          {filteredGallery.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="glass-card hover-lift btn-press"
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                padding: '12px',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: item.aspect === 'portrait' ? '340px' : item.aspect === 'square' ? '280px' : '220px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  marginBottom: '12px',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform var(--transition-smooth)',
                  }}
                  className="hover-scale"
                />

                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                  }}
                >
                  <span className="badge badge-orange">{item.category}</span>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(4, 2, 0, 0.75)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.72rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Eye size={13} />
                  <span>Click to Expand</span>
                </div>
              </div>

              <div style={{ padding: '0 4px' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>{item.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Camera size={13} className="text-orange" />
                    <span>{item.camera}</span>
                  </div>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Viewer */}
      {activeLightbox && (
        <Lightbox
          isOpen={Boolean(activeLightbox)}
          image={activeLightbox.image}
          title={activeLightbox.title}
          caption={`${activeLightbox.category} • ${activeLightbox.camera} • ${activeLightbox.date}`}
          onClose={() => setActiveLightbox(null)}
        />
      )}
    </WindowFrame>
  );
};
