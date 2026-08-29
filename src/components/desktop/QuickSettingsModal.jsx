import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { useTheme } from '../../context/ThemeContext';
import { useAudio } from '../../context/AudioContext';
import { useDeviceStatus } from '../../context/DeviceStatusContext';
import {
  Wifi,
  WifiOff,
  Bluetooth,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  RotateCcw,
  Sparkles,
  Sliders,
  Battery,
  BatteryCharging,
  BatteryMedium,
  BatteryLow,
  BatteryWarning,
  X,
} from 'lucide-react';

export const QuickSettingsModal = () => {
  const { quickSettingsOpen, setQuickSettingsOpen, osModeOverride, setOsModeOverride, addToast } = useOS();
  const { isDark, toggleTheme } = useTheme();
  const { volume, setVolume, isMuted, toggleMute } = useAudio();

  const { batteryLevel, isCharging, isOnline, networkLabel } = useDeviceStatus();
  const [wifiEnabled, setWifiEnabled] = useState(isOnline);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);

  if (!quickSettingsOpen) return null;

  const handleModeChange = (mode) => {
    setOsModeOverride(mode);
    addToast('OS Mode Switched', `Antarmuka dialihkan ke mode: ${mode.toUpperCase()}`, 'info');
  };

  const renderBatteryTileIcon = () => {
    if (isCharging) return <BatteryCharging size={18} className="text-orange" />;
    if (batteryLevel <= 15) return <BatteryWarning size={18} style={{ color: '#EF4444' }} />;
    if (batteryLevel <= 35) return <BatteryLow size={18} style={{ color: '#F59E0B' }} />;
    if (batteryLevel <= 70) return <BatteryMedium size={18} className="text-orange" />;
    return <Battery size={18} className="text-orange" />;
  };

  return (
    <div
      className="animate-slide-up"
      style={{
        position: 'fixed',
        bottom: '84px',
        right: '24px',
        width: '340px',
        background: 'var(--bg-surface-elevated)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '20px',
        boxShadow: 'var(--shadow-dock)',
        zIndex: 1000,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={18} className="text-orange" />
          <h3 style={{ fontSize: '0.96rem', fontWeight: 800, margin: 0 }}>Quick Settings</h3>
        </div>
        <button
          onClick={() => setQuickSettingsOpen(false)}
          style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Quick Tiles Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {/* Wifi Tile */}
        <button
          onClick={() => setWifiEnabled(prev => !prev)}
          className="btn-press"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 14px',
            borderRadius: 'var(--radius-lg)',
            background: (wifiEnabled && isOnline) ? 'var(--color-blue-subtle)' : 'var(--bg-surface)',
            border: `1px solid ${(wifiEnabled && isOnline) ? 'var(--color-blue)' : 'var(--border-medium)'}`,
            color: (wifiEnabled && isOnline) ? 'var(--color-blue)' : 'var(--text-muted)',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          {isOnline && wifiEnabled ? <Wifi size={18} /> : <WifiOff size={18} />}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Network</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>
              {isOnline && wifiEnabled ? networkLabel : 'Offline'}
            </div>
          </div>
        </button>

        {/* Bluetooth Tile */}
        <button
          onClick={() => setBluetoothEnabled(prev => !prev)}
          className="btn-press"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 14px',
            borderRadius: 'var(--radius-lg)',
            background: bluetoothEnabled ? 'var(--color-orange-subtle)' : 'var(--bg-surface)',
            border: `1px solid ${bluetoothEnabled ? 'var(--color-orange)' : 'var(--border-medium)'}`,
            color: bluetoothEnabled ? 'var(--color-orange)' : 'var(--text-muted)',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <Bluetooth size={18} />
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Bluetooth</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{bluetoothEnabled ? 'Ready' : 'Off'}</div>
          </div>
        </button>

        {/* Theme Switcher Tile */}
        <button
          onClick={toggleTheme}
          className="btn-press"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 14px',
            borderRadius: 'var(--radius-lg)',
            background: isDark ? 'var(--color-orange-subtle)' : 'var(--color-blue-subtle)',
            border: `1px solid ${isDark ? 'var(--color-orange)' : 'var(--color-blue)'}`,
            color: isDark ? 'var(--color-orange)' : 'var(--color-blue)',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Theme</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{isDark ? 'Dark Mode' : 'Light Mode'}</div>
          </div>
        </button>

        {/* Real Battery Info Tile */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 14px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            color: 'var(--text-primary)',
          }}
          title={`Baterai: ${batteryLevel}% ${isCharging ? '(Mengisi)' : ''}`}
        >
          {renderBatteryTileIcon()}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Battery</div>
            <div style={{ fontSize: '0.7rem', color: isCharging ? '#10B981' : 'var(--text-muted)' }}>
              {batteryLevel}% • {isCharging ? 'Charging' : 'Discharging'}
            </div>
          </div>
        </div>
      </div>

      {/* Volume Slider */}
      <div style={{ marginBottom: '16px', background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-medium)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Master Volume</span>
          <button
            onClick={toggleMute}
            style={{
              color: isMuted ? '#EF4444' : 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px 6px',
              borderRadius: 'var(--radius-sm)',
              background: isMuted ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
            }}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: isMuted ? '#EF4444' : 'var(--color-orange)' }}
        />
      </div>

      {/* OS Mode Selector (Preview Switcher) */}
      <div style={{ background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-medium)' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Device Experience Mode
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          <button
            onClick={() => handleModeChange('auto')}
            className={`btn-press ${osModeOverride === 'auto' ? 'badge-orange' : 'badge-glass'}`}
            style={{
              padding: '6px 4px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <RotateCcw size={14} />
            <span>Auto</span>
          </button>

          <button
            onClick={() => handleModeChange('desktop')}
            className={`btn-press ${osModeOverride === 'desktop' ? 'badge-blue' : 'badge-glass'}`}
            style={{
              padding: '6px 4px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Monitor size={14} />
            <span>Desktop</span>
          </button>

          <button
            onClick={() => handleModeChange('mobile')}
            className={`btn-press ${osModeOverride === 'mobile' ? 'badge-orange' : 'badge-glass'}`}
            style={{
              padding: '6px 4px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Smartphone size={14} />
            <span>Pixel 16</span>
          </button>
        </div>
      </div>
    </div>
  );
};
