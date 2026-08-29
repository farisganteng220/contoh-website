import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import confetti from 'canvas-confetti';
import {
  HeartHandshake,
  Coffee,
  Heart,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const DonationPage = () => {
  const { addToast, isMobile } = useOS();

  const handleSupportClick = (platform) => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });
    addToast('Terima Kasih Banyak!', `Mengalihkan ke halaman ${platform.name}...`, 'success');
    window.open(platform.url, '_blank');
  };

  return (
    <WindowFrame title="Support Creator & Donations" icon={HeartHandshake} badgeText="Appreciation Hub">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        {/* Appreciation Hero Card */}
        <div
          className="glass-card"
          style={{
            padding: isMobile ? '24px 18px' : '36px',
            borderRadius: 'var(--radius-xl)',
            textAlign: 'center',
            background: 'var(--bg-surface)',
          }}
        >
          <div
            style={{
              width: isMobile ? '52px' : '64px',
              height: isMobile ? '52px' : '64px',
              borderRadius: '50%',
              background: 'var(--color-orange)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 4px 18px rgba(255, 156, 15, 0.45)',
            }}
          >
            <Heart size={isMobile ? 24 : 32} fill="currentColor" />
          </div>

          <h1 style={{ fontSize: isMobile ? '1.45rem' : '2.1rem', marginBottom: '8px', lineHeight: '1.2' }}>
            “Your Support Helps Me <span className="text-gradient">Create More.</span>”
          </h1>
          <p style={{ maxWidth: '640px', margin: '0 auto 20px auto', fontSize: '0.96rem' }}>
            Setiap traktir kopi dan donasi yang Anda berikan sangat berarti untuk membiayai server aset gratis, software riset, dan produksi tutorial kreatif bagi komunitas.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-medium)' }}>
            <Sparkles size={16} className="text-orange" />
            <span style={{ fontSize: '0.84rem', fontWeight: 700 }}>Semua donatur mendapatkan special badge di VIP lounge!</span>
          </div>
        </div>

        {/* SECTION: Two Main Platforms (Trakteer & Saweria) */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {siteConfig.donations.map(platform => (
            <div
              key={platform.id}
              className="glass-card hover-lift"
              style={{
                padding: isMobile ? '24px 20px' : '32px',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: `2px solid ${platform.color}40`,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div
                    style={{
                      padding: '10px 18px',
                      borderRadius: 'var(--radius-pill)',
                      background: `${platform.color}15`,
                      color: platform.color,
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      border: `1px solid ${platform.color}40`,
                    }}
                  >
                    {platform.name}
                  </div>
                  <span className="badge badge-glass">{platform.unit}</span>
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: '6px' }}>{platform.logoText}</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-orange)', fontWeight: 600, marginBottom: '12px' }}>
                  {platform.tagline}
                </p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '24px' }}>
                  {platform.description}
                </p>
              </div>

              <button
                onClick={() => handleSupportClick(platform)}
                className="btn btn-sm"
                style={{
                  background: platform.color,
                  color: '#fff',
                  padding: '14px 20px',
                  fontWeight: 700,
                  fontSize: '0.94rem',
                  boxShadow: `0 8px 24px ${platform.color}40`,
                }}
              >
                <Coffee size={18} />
                <span>{platform.buttonText}</span>
                <ExternalLink size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
};
