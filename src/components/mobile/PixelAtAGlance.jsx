import React, { useState, useEffect } from 'react';
import { CloudSun, Sparkles, MapPin, Sun } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const PixelAtAGlance = () => {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const d = new Date();
    setDateStr(
      d.toLocaleDateString('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      })
    );
  }, []);

  return (
    <div className="pixel-at-a-glance">
      <div className="at-a-glance-date">
        <span>{dateStr}</span>
        <span style={{ color: 'var(--border-medium)' }}>•</span>
        <div className="weather-badge">
          <Sun size={14} />
          <span>29°C Cerah</span>
        </div>
      </div>

      <div className="at-a-glance-weather">
        <MapPin size={13} className="text-orange" />
        <span style={{ fontSize: '0.82rem' }}>Jakarta • {siteConfig.profile.status}</span>
      </div>
    </div>
  );
};
