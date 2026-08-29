import React from 'react';
import { useOS } from '../../context/OSContext';
import { ArrowLeft, X, RefreshCw } from 'lucide-react';
import { DecorativeBackground } from './DecorativeBackground';

export const WindowFrame = ({
  title,
  icon: Icon,
  children,
  badgeText = "Personal OS v2.5",
  onClose,
  decorScheme = 'mixed',
}) => {
  const { isMobile, closeApp, windowState, setWindowState } = useOS();

  const handleClose = () => {
    if (onClose) onClose();
    else closeApp();
  };

  const toggleMaximize = () => {
    setWindowState(prev => (prev === 'maximized' ? 'normal' : 'maximized'));
  };

  if (isMobile) {
    return (
      <div className="mobile-standalone-page animate-fade-in" style={{ width: '100%', minHeight: '100vh', paddingBottom: '90px', position: 'relative' }}>
        <DecorativeBackground variant="subtle" scheme={decorScheme} cols={7} rows={5} opacity={0.7} />
        <header className="mobile-page-header">
          <div className="mobile-header-left">
            <button className="mobile-header-btn mobile-back-btn btn-press" onClick={handleClose} aria-label="Go Back" title="Kembali">
              <ArrowLeft size={19} />
            </button>
          </div>
          <div className="mobile-header-center">
            {Icon && <Icon size={18} className="text-orange mobile-header-icon" />}
            <span className="mobile-page-title">{title}</span>
          </div>
          <div className="mobile-header-right">
            <button className="mobile-header-btn mobile-close-btn btn-press" onClick={handleClose} aria-label="Close Page" title="Tutup Halaman">
              <X size={18} />
            </button>
          </div>
        </header>
        <main style={{ padding: '16px 14px', position: 'relative', zIndex: 1 }}>
          {children}
        </main>
      </div>
    );
  }

  const isMaximized = windowState === 'maximized';

  return (
    <div className="os-window-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) handleClose();
    }}>
      <div
        className="os-window"
        style={{
          width: isMaximized ? '98vw' : '92vw',
          maxWidth: isMaximized ? '100%' : '1240px',
          height: isMaximized ? '96vh' : '86vh',
          transition: 'all var(--transition-normal)',
        }}
      >
        <div className="os-window-header">
          <div className="os-window-controls">
            <button className="window-btn window-btn-close" title="Close Application" onClick={handleClose} />
            <button className="window-btn window-btn-min" title="Minimize" onClick={handleClose} />
            <button className="window-btn window-btn-max" title={isMaximized ? 'Restore Window' : 'Maximize Window'} onClick={toggleMaximize} />
          </div>
          <div className="os-window-title">
            {Icon && <Icon size={16} className="text-orange" />}
            <span>{title}</span>
            <span className="badge badge-glass" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>{badgeText}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => window.location.reload()} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} title="Refresh App">
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
        <div className="os-window-body" style={{ position: 'relative' }}>
          <DecorativeBackground variant="subtle" scheme={decorScheme} cols={10} rows={7} opacity={0.65} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
