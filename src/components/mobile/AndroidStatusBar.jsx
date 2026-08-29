import React, { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  BatteryMedium,
  BatteryLow,
  BatteryWarning,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useDeviceStatus } from '../../context/DeviceStatusContext';

export const AndroidStatusBar = () => {
  const [timeStr, setTimeStr] = useState('');
  const { batteryLevel, isCharging, isOnline, networkLabel, deviceLabel, isTablet } = useDeviceStatus();

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

  // Adaptive Battery Icon based on real device battery status
  const renderBatteryIcon = () => {
    if (isCharging) {
      return <BatteryCharging size={14} className="text-orange" />;
    }
    if (batteryLevel <= 15) {
      return <BatteryWarning size={14} style={{ color: '#EF4444' }} />;
    }
    if (batteryLevel <= 35) {
      return <BatteryLow size={14} style={{ color: '#F59E0B' }} />;
    }
    if (batteryLevel <= 70) {
      return <BatteryMedium size={14} className="text-orange" />;
    }
    return <Battery size={14} className="text-orange" />;
  };

  return (
    <div
      className="android-status-bar"
      style={{
        padding: isTablet ? '8px 24px' : '6px 16px',
        transition: 'padding 0.2s ease',
      }}
    >
      <div className="status-left">
        <span style={{ fontWeight: 800, fontSize: isTablet ? '0.92rem' : '0.86rem' }}>{timeStr}</span>
        <span
          style={{
            fontSize: isTablet ? '0.76rem' : '0.72rem',
            color: 'var(--color-orange)',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            fontWeight: 700,
          }}
        >
          • {deviceLabel}
        </span>
      </div>

      <div className="status-right" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Real Network Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {isOnline ? (
            <Wifi size={13} className="text-blue" />
          ) : (
            <WifiOff size={13} style={{ color: '#EF4444' }} />
          )}
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: isOnline ? 'var(--text-primary)' : '#EF4444',
            }}
          >
            {networkLabel}
          </span>
        </div>

        {/* Real Battery Indicator */}
        <div
          className="status-pill-battery"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: isCharging ? 'rgba(255,156,15,0.18)' : 'var(--bg-surface)',
            border: isCharging ? '1px solid rgba(255,156,15,0.4)' : '1px solid var(--border-medium)',
            padding: '2px 8px',
            borderRadius: '12px',
          }}
          title={`Baterai Perangkat: ${batteryLevel}% ${isCharging ? '(Sedang Mengisi Daya)' : ''}`}
        >
          {renderBatteryIcon()}
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: batteryLevel <= 15 && !isCharging ? '#EF4444' : 'var(--text-primary)',
            }}
          >
            {batteryLevel}%
          </span>
          {isCharging && (
            <Zap size={10} style={{ color: 'var(--color-orange)', fill: 'currentColor' }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AndroidStatusBar;
