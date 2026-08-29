import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import {
  Users,
  MessageCircle,
  Send,
  Sparkles,
  CheckCircle2,
  Share2,
  Heart,
  ExternalLink,
} from 'lucide-react';

export const CommunityPage = () => {
  const { isMobile } = useOS();
  return (
    <WindowFrame title="Creative Creator Community" icon={Users} badgeText="Connect & Share">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        {/* Header Hero */}
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
              borderRadius: '20px',
              background: 'var(--color-orange)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 8px 24px rgba(255, 156, 15, 0.35)',
            }}
          >
            <Users size={isMobile ? 24 : 32} />
          </div>

          <h1 style={{ fontSize: isMobile ? '1.45rem' : '2.1rem', marginBottom: '10px', lineHeight: '1.2' }}>
            Join the Community and Connect with <span className="text-gradient">Other Creative People</span>
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto 20px auto', fontSize: '1rem' }}>
            Bergabunglah dengan ribuan editor video, graphic designer, dan creator digital untuk saling berbagi preset, feedback karya, peluang freelance, dan tutorial eksklusif.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-medium)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25D366' }} />
            <span style={{ fontSize: '0.84rem', fontWeight: 700 }}>8,200+ Active Creative Members</span>
          </div>
        </div>

        {/* SECTION: Two Main Community Cards (WhatsApp & Telegram) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* WhatsApp Card */}
          <div
            className="glass-card hover-lift"
            style={{
              padding: '32px',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '2px solid rgba(37, 211, 102, 0.3)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '18px',
                    background: '#25D366',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
                  }}
                >
                  <MessageCircle size={32} />
                </div>
                <span className="badge" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366' }}>
                  2,400+ Members
                </span>
              </div>

              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>WhatsApp VIP Community</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                Grup WhatsApp interaktif untuk diskusi real-time, sharing tips pengeditan cepat, dan review karya langsung oleh Alex Vantara.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {[
                  'Akses weekly free preset & LUTs',
                  'Feedback & review karya kamu langsung',
                  'Info lowongan job freelance kreatif',
                  'Sharing tutorial editing eksklusif',
                ].map((perk, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={16} style={{ color: '#25D366' }} />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://chat.whatsapp.com/sampleInviteLink123"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm"
              style={{
                background: '#25D366',
                color: '#fff',
                fontWeight: 700,
                padding: '12px 20px',
                fontSize: '0.94rem',
                boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)',
              }}
            >
              <MessageCircle size={18} />
              <span>Join WhatsApp Community</span>
            </a>
          </div>

          {/* Telegram Card */}
          <div
            className="glass-card hover-lift"
            style={{
              padding: '32px',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '2px solid rgba(34, 158, 217, 0.3)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '18px',
                    background: '#229ED9',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(34, 158, 217, 0.4)',
                  }}
                >
                  <Send size={30} style={{ marginLeft: '-2px' }} />
                </div>
                <span className="badge" style={{ background: 'rgba(34, 158, 217, 0.15)', color: '#229ED9' }}>
                  5,800+ Subscribers
                </span>
              </div>

              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Telegram Resource Hub</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                Cloud archive tercepat untuk download sound effects WAV tanpa batas, template project After Effects, font pairing packs, dan info update produk.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {[
                  'Cloud storage download file resolusi tinggi',
                  'Diskon khusus member untuk premium apps',
                  'Akses template Premiere & After Effects',
                  'Pemberitahuan instan live stream & webinar',
                ].map((perk, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={16} style={{ color: '#229ED9' }} />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://t.me/vantara_creatives"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm"
              style={{
                background: '#229ED9',
                color: '#fff',
                fontWeight: 700,
                padding: '12px 20px',
                fontSize: '0.94rem',
                boxShadow: '0 6px 20px rgba(34, 158, 217, 0.35)',
              }}
            >
              <Send size={18} />
              <span>Join Telegram Channel</span>
            </a>
          </div>
        </div>

        {/* Community Rules / Code of Conduct */}
        <div className="glass-card" style={{ padding: '24px 30px', borderRadius: 'var(--radius-xl)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>Aturan & Etika Komunitas</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              🤝 <strong>Saling Menghargai:</strong> Berikan kritik dan masukan yang membangun untuk setiap karya anggota.
            </div>
            <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              🚫 <strong>Bebas Spam:</strong> Dilarang promosi produk tanpa izin moderator di ruang diskusi umum.
            </div>
            <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              💡 <strong>Budaya Berbagi:</strong> Bagikan ilmu baru, shortcut editing, dan inspirasi desain kepada sesama.
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};
