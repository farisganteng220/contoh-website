import React from 'react';
import { useOS } from '../../context/OSContext';
import { useTheme } from '../../context/ThemeContext';
import { APP_REGISTRY } from '../desktop/AppLauncherModal';
import { Sparkles, Sliders, Sun, Moon } from 'lucide-react';
import { DecorativeBackground } from '../common/DecorativeBackground';

export const AndroidAppGrid = () => {
  const { openApp } = useOS();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="android-app-grid" style={{ position: 'relative' }}>
      <DecorativeBackground variant="micro" scheme="mixed" cols={5} rows={4} opacity={0.45} />
      {APP_REGISTRY.map(app => {
        const Icon = app.icon;
        return (
          <div
            key={app.id}
            className="android-app-item"
            onClick={() => openApp(app.id)}
          >
            <div
              className="android-app-icon-squircle"
              style={{
                background: app.color,
                color: '#FFFFFF',
                boxShadow: `0 6px 18px ${app.color}45`,
              }}
            >
              <Icon size={26} />
            </div>
            <span className="android-app-label">{app.name}</span>
          </div>
        );
      })}

      {/* Theme Quick Toggle App */}
      <div className="android-app-item" onClick={toggleTheme}>
        <div
          className="android-app-icon-squircle"
          style={{
            background: isDark ? '#FF9C0F' : '#0052F5',
            color: '#FFFFFF',
            boxShadow: isDark ? '0 6px 18px rgba(255, 156, 15, 0.45)' : '0 6px 18px rgba(0, 82, 245, 0.45)',
          }}
        >
          {isDark ? <Sun size={26} /> : <Moon size={26} />}
        </div>
        <span className="android-app-label">{isDark ? 'Light UI' : 'Dark UI'}</span>
      </div>
    </div>
  );
};
