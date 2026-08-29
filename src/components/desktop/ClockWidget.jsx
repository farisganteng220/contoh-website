import React, { useState, useEffect } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { Clock, Sparkles, MapPin } from 'lucide-react';
import { DecorativeBackground } from '../common/DecorativeBackground';

export const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  const dateString = time.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="os-widget hover-lift" style={{ position: 'relative', overflow: 'hidden' }}>
      <DecorativeBackground variant="micro" scheme="orange" cols={5} rows={4} opacity={0.5} />
      <div className="os-widget-header">
        <span className="os-widget-title">
          <Clock size={16} className="text-orange" />
          System Clock
        </span>
        <span className="badge badge-orange">Live GMT+7</span>
      </div>

      <div style={{ textAlign: 'center', padding: '8px 0 16px 0' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3.4rem',
            fontWeight: 800,
            lineHeight: 1,
            color: 'var(--color-orange)',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          <span>{hours}:{minutes}</span>
          <span style={{ fontSize: '1.4rem', opacity: 0.8, WebkitTextFillColor: 'var(--color-orange)' }}>
            :{seconds}
          </span>
        </div>

        <p style={{ marginTop: '8px', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {dateString}
        </p>
      </div>

      <div
        style={{
          background: 'var(--bg-surface)',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-medium)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Current Status</p>
          <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {siteConfig.profile.status}
          </p>
        </div>
      </div>
    </div>
  );
};
