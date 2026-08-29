import React from 'react';
import { X, ZoomIn, Download, ExternalLink } from 'lucide-react';

export const Lightbox = ({ isOpen, image, title, caption, onClose }) => {
  if (!isOpen || !image) return null;

  return (
    <div
      className="animate-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(4, 2, 0, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Lightbox Top Controls */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10,
        }}
      >
        <a
          href={image}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-glass btn-sm"
          style={{ color: '#fff' }}
        >
          <ExternalLink size={16} />
          <span>Full Res</span>
        </a>
        <button
          onClick={onClose}
          className="btn btn-primary-orange btn-sm"
          style={{ width: '38px', height: '38px', padding: 0, borderRadius: '50%' }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Preview Container */}
      <div
        className="animate-scale-in"
        style={{
          maxWidth: '90vw',
          maxHeight: '78vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={image}
          alt={title || 'Portfolio Preview'}
          style={{
            maxWidth: '100%',
            maxHeight: '72vh',
            objectFit: 'contain',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 1px rgba(255,156,15,0.4)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        />
        {(title || caption) && (
          <div
            style={{
              marginTop: '16px',
              textAlign: 'center',
              background: 'rgba(20, 16, 12, 0.8)',
              backdropFilter: 'blur(12px)',
              padding: '10px 24px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(255, 156, 15, 0.2)',
            }}
          >
            {title && <h3 style={{ color: '#fff', fontSize: '1.05rem', margin: 0 }}>{title}</h3>}
            {caption && <p style={{ color: 'var(--color-orange)', fontSize: '0.85rem', margin: '2px 0 0 0' }}>{caption}</p>}
          </div>
        )}
      </div>
    </div>
  );
};
