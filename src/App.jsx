import React from 'react';
import { useOS } from './context/OSContext';
import { useTheme } from './context/ThemeContext';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { PremiumAppsPage } from './pages/PremiumAppsPage';
import { CommissionPage } from './pages/CommissionPage';
import { CommunityPage } from './pages/CommunityPage';
import { DonationPage } from './pages/DonationPage';
import { VisualIdentityPage } from './pages/VisualIdentityPage';
import { ContactPage } from './pages/ContactPage';
import { OnlineShopPage } from './pages/OnlineShopPage';
import { GalleryPage } from './pages/GalleryPage';
import { FileExplorerPage } from './pages/FileExplorerPage';
import { MusicPage } from './pages/MusicPage';
import { CameraPage } from './pages/CameraPage';

import { DesktopShelf } from './components/desktop/DesktopShelf';
import { QuickSettingsModal } from './components/desktop/QuickSettingsModal';
import { AppLauncherModal } from './components/desktop/AppLauncherModal';

import { AndroidStatusBar } from './components/mobile/AndroidStatusBar';
import { AndroidBottomDock } from './components/mobile/AndroidBottomDock';
import { AndroidNavPill } from './components/mobile/AndroidNavPill';

import { FloatingMusicPlayer } from './components/audio/FloatingMusicPlayer';
import { ToastNotification } from './components/common/ToastNotification';
import { UniversalSearchModal } from './components/common/UniversalSearchModal';

export const App = () => {
  const { activeApp, isMobile } = useOS();
  const { isDark } = useTheme();

  const renderActivePage = () => {
    switch (activeApp) {
      case 'portfolio':
        return <PortfolioPage />;
      case 'about':
        return <AboutPage />;
      case 'apps':
        return <PremiumAppsPage />;
      case 'commission':
        return <CommissionPage />;
      case 'community':
        return <CommunityPage />;
      case 'donation':
        return <DonationPage />;
      case 'visual-identity':
        return <VisualIdentityPage />;
      case 'contact':
        return <ContactPage />;
      case 'shop':
        return <OnlineShopPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'files':
        return <FileExplorerPage />;
      case 'music':
        return <MusicPage />;
      case 'camera':
        return <CameraPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={isMobile ? 'mobile-android-wrapper' : 'desktop-os-wrapper'}>
      {/* Ambient Radial Background Glows */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {/* Mobile Top Status Bar */}
      {isMobile && <AndroidStatusBar />}

      {/* Main Active Page Content / Workspace */}
      {renderActivePage()}

      {/* Desktop Specific OS Chrome & Navigation */}
      {!isMobile && (
        <>
          <DesktopShelf />
          <QuickSettingsModal />
          <AppLauncherModal />
          <FloatingMusicPlayer />
        </>
      )}

      {/* Mobile Specific Floating Dock & Gesture Bar */}
      {isMobile && (
        <>
          <AndroidBottomDock />
          <AndroidNavPill />
        </>
      )}

      {/* Universal Search & Spotlight Modal (Global across Desktop & Mobile) */}
      <UniversalSearchModal />

      {/* Global System Toasts */}
      <ToastNotification />
    </div>
  );
};

export default App;
