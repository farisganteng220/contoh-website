import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAudio } from './AudioContext';

const OSContext = createContext();

export const OSProvider = ({ children }) => {
  const { playSoundEffect } = useAudio();
  const [activeApp, setActiveApp] = useState('home');
  const [windowState, setWindowState] = useState('normal'); // 'normal' | 'maximized' | 'minimized'
  const [isWindowed, setIsWindowed] = useState(true);
  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [appLauncherOpen, setAppLauncherOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [osModeOverride, setOsModeOverride] = useState('auto'); // 'auto' | 'desktop' | 'mobile'
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(window.innerWidth <= 860);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = osModeOverride === 'auto' ? isMobileDevice : osModeOverride === 'mobile';

  // Handle URL hash changes or back button
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '') || 'home';
      setActiveApp(hash);
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Global keyboard shortcuts (Ctrl+K to search, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setAppLauncherOpen(false);
        setQuickSettingsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openApp = (appId) => {
    playSoundEffect('open');
    setActiveApp(appId);
    window.location.hash = `#/${appId === 'home' ? '' : appId}`;
    setAppLauncherOpen(false);
    setSearchModalOpen(false);
  };

  const closeApp = () => {
    playSoundEffect('click');
    setActiveApp('home');
    window.location.hash = '#/';
  };

  const addToast = (title, message, type = 'info') => {
    const id = Date.now();
    const newToast = { id, title, message, type };
    setToasts(prev => [...prev.slice(-3), newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <OSContext.Provider
      value={{
        activeApp,
        setActiveApp,
        openApp,
        closeApp,
        windowState,
        setWindowState,
        isWindowed,
        setIsWindowed,
        quickSettingsOpen,
        setQuickSettingsOpen,
        appLauncherOpen,
        setAppLauncherOpen,
        searchModalOpen,
        setSearchModalOpen,
        toasts,
        addToast,
        removeToast,
        isMobile,
        isMobileDevice,
        osModeOverride,
        setOsModeOverride,
      }}
    >
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};
