import React from 'react';
import { Search, Mic, Camera, Sparkles } from 'lucide-react';
import { useOS } from '../../context/OSContext';

export const GoogleSearchPill = () => {
  const { setSearchModalOpen, openApp } = useOS();

  return (
    <div
      className="android-search-pill btn-press"
      onClick={() => setSearchModalOpen(true)}
      style={{ cursor: 'pointer' }}
    >
      <div className="search-pill-left">
        {/* Google 'G' stylized logo */}
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: '#0052F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '0.82rem',
            boxShadow: '0 2px 8px rgba(0, 82, 245, 0.35)',
          }}
        >
          G
        </div>
        <span>Cari aplikasi, musik, portofolio...</span>
      </div>

      <div className="search-pill-icons">
        <Mic
          size={18}
          style={{ color: 'var(--color-blue)', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            setSearchModalOpen(true);
          }}
        />
        <Camera
          size={18}
          style={{ color: 'var(--color-orange)', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            openApp('camera');
          }}
        />
      </div>
    </div>
  );
};
