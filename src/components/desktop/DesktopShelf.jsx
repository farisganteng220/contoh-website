import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { useTheme } from '../../context/ThemeContext';
import { useDeviceStatus } from '../../context/DeviceStatusContext';
import { siteConfig } from '../../config/siteConfig';
import { InstagramIcon, YoutubeIcon, TikTokIcon } from '../common/BrandIcons';
import {
  Grid,
  Camera,
  Globe,
  MessageSquare,
  Image,
  Store,
  FolderTree,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  BatteryMedium,
  BatteryLow,
  BatteryWarning,
  Sliders,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';

export const DesktopShelf = () => {
  const {
    activeApp,
    openApp,
    setAppLauncherOpen,
    appLauncherOpen,
    quickSettingsOpen,
    setQuickSettingsOpen,
  } = useOS();
  const { isDark, toggleTheme } = useTheme();

  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(
        d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { batteryLevel, isCharging, isOnline, networkLabel } = useDeviceStatus();

  // Adaptive Battery Icon for Desktop Tray
  const renderBatteryIcon = () => {
    if (isCharging) return <BatteryCharging size={14} className="text-orange" />;
    if (batteryLevel <= 15) return <BatteryWarning size={14} style={{ color: '#EF4444' }} />;
    if (batteryLevel <= 35) return <BatteryLow size={14} style={{ color: '#F59E0B' }} />;
    if (batteryLevel <= 70) return <BatteryMedium size={14} className="text-orange" />;
    return <Battery size={14} className="text-orange" />;
  };

  const shelfApps = [
    { id: 'camera', name: 'Camera Creative', icon: Camera, color: '#EC4899', isExternal: false },
    { id: 'portfolio', name: 'Browser / Portfolio Links', icon: Globe, color: '#0052F5', isExternal: false },
    { id: 'contact', name: 'Contact Us', icon: MessageSquare, color: '#25D366', isExternal: false },
    { id: 'gallery', name: 'Gallery Collection', icon: Image, color: '#8B5CF6', isExternal: false },
    { id: 'tiktok', name: 'TikTok Portfolio', icon: TikTokIcon, color: '#00F2FE', isExternal: true, url: siteConfig.socials.tiktok.url },
    { id: 'instagram', name: 'Instagram Visuals', icon: InstagramIcon, color: '#E1306C', isExternal: true, url: siteConfig.socials.instagram.url },
    { id: 'youtube', name: 'YouTube Channel', icon: YoutubeIcon, color: '#FF0000', isExternal: true, url: siteConfig.socials.youtube.url },
    { id: 'shop', name: 'Online Shop / Marketplace', icon: Store, color: '#EE4D2D', isExternal: false },
    { id: 'files', name: 'File Explorer', icon: FolderTree, color: '#0052F5', isExternal: false },
  ];

  return (
    <div className="desktop-shelf-container">
      <div className="desktop-shelf">
        {/* ChromeOS App Launcher Icon */}
        <div className="tooltip-container">
          <button
            onClick={() => setAppLauncherOpen(prev => !prev)}
            className={`shelf-app-icon ${appLauncherOpen ? 'active' : ''}`}
            style={{
              background: appLauncherOpen ? 'var(--color-orange)' : 'var(--bg-surface)',
              color: appLauncherOpen ? '#fff' : 'var(--color-orange)',
            }}
            aria-label="Application Launcher"
          >
            <Grid size={22} />
          </button>
          <span className="tooltip">App Launcher</span>
        </div>

        <div className="shelf-divider" />

        {/* Shelf Apps */}
        {shelfApps.map(app => {
          const Icon = app.icon;
          const isActive = activeApp === app.id;

          if (app.isExternal) {
            return (
              <div key={app.id} className="tooltip-container">
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shelf-app-icon"
                  style={{ color: app.color }}
                  aria-label={app.name}
                >
                  <Icon size={20} color={app.color} />
                </a>
                <span className="tooltip">{app.name} ↗</span>
              </div>
            );
          }

          return (
            <div key={app.id} className="tooltip-container">
              <button
                onClick={() => openApp(app.id)}
                className={`shelf-app-icon ${isActive ? 'active' : ''}`}
                style={{ color: isActive ? 'var(--color-orange)' : 'var(--text-primary)' }}
                aria-label={app.name}
              >
                <Icon size={20} />
              </button>
              <span className="tooltip">{app.name}</span>
            </div>
          );
        })}

        <div className="shelf-divider" />

        {/* System Status Tray */}
        <div className="tooltip-container">
          <div
            className="shelf-system-tray"
            onClick={() => setQuickSettingsOpen(prev => !prev)}
            title={`Baterai: ${batteryLevel}% ${isCharging ? '(Mengisi)' : ''} | Jaringan: ${networkLabel}`}
          >
            {isOnline ? (
              <Wifi size={14} className="text-blue" />
            ) : (
              <WifiOff size={14} style={{ color: '#EF4444' }} />
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              {renderBatteryIcon()}
              <span style={{ fontSize: '0.72rem', fontWeight: 700 }}>{batteryLevel}%</span>
            </div>
            <span className="tray-time">{timeStr}</span>
            <Sliders size={14} style={{ color: 'var(--text-muted)' }} />
          </div>
          <span className="tooltip">Status: {batteryLevel}% ({isCharging ? 'Mengisi' : 'Baterai'}) • {networkLabel}</span>
        </div>
      </div>
    </div>
  );
};
