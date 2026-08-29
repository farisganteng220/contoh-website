import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import {
  User,
  Sparkles,
  Award,
  Clock,
  Layers,
  CheckCircle2,
  Send,
  Code2,
  Flame,
  Star,
  MapPin,
  Briefcase,
  FolderGit2,
  HeartHandshake,
  Zap,
  Check,
  Globe,
} from 'lucide-react';

export const AboutPage = () => {
  const { isMobile, openApp } = useOS();

  // ==========================================
  // MOBILE VIEW: Android 16 Google Pixel Profile UI
  // ==========================================
  if (isMobile) {
    return (
      <WindowFrame title="About Creator (Android 16)" icon={User} badgeText="Pixel Profile">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Mobile Profile Hero Card */}
          <div
            className="glass-card"
            style={{
              padding: '24px 18px',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--bg-surface)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '14px',
            }}
          >
            {/* Avatar with Status Ring */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '32px',
                  overflow: 'hidden',
                  border: '3px solid var(--color-orange)',
                  boxShadow: 'var(--shadow-glow-orange)',
                }}
              >
                <img
                  src={siteConfig.profile.avatar}
                  alt={siteConfig.profile.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--color-orange)',
                  color: '#fff',
                  padding: '2px 10px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                }}
              >
                PRO CREATOR
              </div>
            </div>

            {/* Name & Role */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '1.45rem', margin: 0 }}>{siteConfig.profile.name}</h2>
                <CheckCircle2 size={18} className="text-orange" />
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-orange)', fontWeight: 700, margin: '0 0 6px 0' }}>
                {siteConfig.profile.tagline}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge badge-orange" style={{ fontSize: '0.68rem' }}>{siteConfig.profile.role}</span>
                <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>
                  <MapPin size={11} />
                  {siteConfig.profile.location}
                </span>
              </div>
            </div>

            {/* Quick Action Buttons for Mobile */}
            <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '4px' }}>
              <button
                onClick={() => openApp('commission')}
                className="btn btn-primary-orange btn-sm btn-press"
                style={{ flex: 1, padding: '10px', fontSize: '0.82rem', justifyContent: 'center' }}
              >
                <Sparkles size={14} />
                <span>Order Project</span>
              </button>
              <button
                onClick={() => openApp('contact')}
                className="btn btn-glass btn-sm btn-press"
                style={{ flex: 1, padding: '10px', fontSize: '0.82rem', justifyContent: 'center' }}
              >
                <Send size={14} />
                <span>Hubungi</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {[
              { label: 'Pengalaman', value: '5+ Thn', icon: Clock },
              { label: 'Proyek Selesai', value: '150+', icon: FolderGit2 },
              { label: 'Kepuasan', value: '99.8%', icon: Star },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '12px 8px',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Icon size={16} className="text-orange" />
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>{stat.value}</span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{stat.label}</span>
                </div>
              );
            })}
          </div>

          {/* Bio Description Card */}
          <div className="glass-card" style={{ padding: '18px', borderRadius: 'var(--radius-xl)' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-orange)', display: 'block', marginBottom: '8px' }}>
              Biografi & Visi Kreatif
            </span>
            <p style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-secondary)', margin: 0 }}>
              {siteConfig.profile.fullBio}
            </p>
          </div>

          {/* SECTION: What I Do (Mobile Cards) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Layers size={18} className="text-orange" />
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Layanan & Keahlian Utama</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {siteConfig.whatIDo.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card btn-press"
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: `${item.accent}20`,
                      color: item.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${item.accent}40`,
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', margin: '0 0 4px 0' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: Technical Skills (Mobile Progress) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Flame size={18} className="text-blue" />
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Skill & Software Mastery</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {siteConfig.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-lg)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700 }}>{skill.name}</span>
                    <span className="badge badge-orange" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Visual Bar */}
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      background: 'var(--border-medium)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        background: idx % 2 === 0 ? 'var(--color-orange)' : 'var(--color-blue)',
                        borderRadius: '3px',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: Creative Journey (Mobile Timeline) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Clock size={18} className="text-orange" />
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Riwayat Pengalaman</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { year: '2024 - Sekarang', role: 'Lead Visual Designer & Creative Developer', company: 'Vantara Studio OS', desc: 'Membangun ekosistem portofolio digital berbasis OS dan toolset visual.' },
                { year: '2022 - 2024', role: 'Senior Video Editor & Motion Designer', company: 'CyberWave Media', desc: 'Memimpin tim video editor dalam produksi 200+ reels viral dengan 15M+ views.' },
                { year: '2019 - 2022', role: 'Freelance Graphic Designer & Retoucher', company: 'Independent Creator', desc: 'Mengerjakan visual identity, photo manipulation untuk 100+ klien.' },
              ].map((exp, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="badge badge-orange" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>{exp.year}</span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-blue)', fontWeight: 700 }}>{exp.company}</span>
                  </div>
                  <h4 style={{ fontSize: '0.92rem', margin: '4px 0 2px 0' }}>{exp.role}</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0 }}>
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </WindowFrame>
    );
  }

  // ==========================================
  // DESKTOP & TABLET VIEW: ChromeOS / FydeOS Bio Deck
  // ==========================================
  return (
    <WindowFrame title="About Creator" icon={User} badgeText="Biography & Skills">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        {/* Top Hero Bio Card */}
        <div
          className="glass-card"
          style={{
            padding: '32px',
            borderRadius: 'var(--radius-xl)',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '28px',
            alignItems: 'center',
            background: 'var(--bg-surface)',
          }}
        >
          {/* Avatar Container */}
          <div style={{ position: 'relative' }}>
            <img
              src={siteConfig.profile.avatar}
              alt={siteConfig.profile.name}
              style={{
                width: '140px',
                height: '140px',
                borderRadius: 'var(--radius-xl)',
                objectFit: 'cover',
                border: '3px solid var(--color-orange)',
                boxShadow: 'var(--shadow-glow-orange)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--color-orange)',
                color: '#fff',
                padding: '3px 10px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.72rem',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              PRO CREATOR
            </div>
          </div>

          {/* Bio Text */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-orange">{siteConfig.profile.role}</span>
              <span className="badge badge-blue">
                <MapPin size={12} />
                {siteConfig.profile.location}
              </span>
            </div>

            <h1 style={{ fontSize: '2.2rem', marginBottom: '6px' }}>{siteConfig.profile.name}</h1>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-orange)', marginBottom: '14px' }}>
              {siteConfig.profile.tagline}
            </p>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
              {siteConfig.profile.fullBio}
            </p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => openApp('commission')}
                className="btn btn-primary-orange btn-sm"
              >
                <Sparkles size={15} />
                <span>Start Commission</span>
              </button>
              <button
                onClick={() => openApp('contact')}
                className="btn btn-glass btn-sm"
              >
                <Send size={15} />
                <span>Contact via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION: What I Do (Services & Core Activities) */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Layers size={20} className="text-orange" />
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>What I Do</h2>
          </div>
          <p style={{ marginBottom: '20px', maxWidth: '650px' }}>
            Layanan utama dan fokus keahlian profesional yang saya kerjakan setiap hari.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
            {siteConfig.whatIDo.map((item, idx) => (
              <div
                key={idx}
                className="glass-card hover-lift"
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    background: `${item.accent}20`,
                    color: item.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${item.accent}40`,
                  }}
                >
                  <Sparkles size={22} />
                </div>
                <h3 style={{ fontSize: '1.12rem', margin: 0 }}>{item.title}</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: Technical Skills & Visual Progress */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Flame size={20} className="text-blue" />
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Skills & Software Proficiency</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
            {siteConfig.skills.map((skill, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '18px 20px',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>{skill.name}</span>
                  </div>
                  <span className="badge badge-orange" style={{ fontSize: '0.72rem' }}>
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Visual Bar */}
                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    background: 'var(--border-medium)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${skill.level}%`,
                      height: '100%',
                      background: idx % 2 === 0 ? 'var(--color-orange)' : 'var(--color-blue)',
                      borderRadius: '3px',
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                  {skill.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: Experience & Creative Journey Timeline */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Clock size={20} className="text-orange" />
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Creative Journey & Experience</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { year: '2024 - Sekarang', role: 'Lead Visual Designer & Creative Developer', company: 'Vantara Studio OS', desc: 'Membangun ekosistem portofolio digital berbasis OS, toolset video editing otomatis, dan konten visual untuk kreator global.' },
              { year: '2022 - 2024', role: 'Senior Video Editor & Motion Designer', company: 'CyberWave Media', desc: 'Memimpin tim video editor dalam produksi 200+ reels viral dan commercial branding video dengan total 15M+ views.' },
              { year: '2019 - 2022', role: 'Freelance Graphic Designer & Retoucher', company: 'Independent Creator', desc: 'Mengerjakan visual identity, photo manipulation, dan branding assets untuk 100+ UMKM dan klien internasional.' },
            ].map((exp, idx) => (
              <div
                key={idx}
                className="glass-card hover-lift"
                style={{
                  padding: '20px 24px',
                  borderRadius: 'var(--radius-lg)',
                  display: 'grid',
                  gridTemplateColumns: '140px 1fr',
                  gap: '20px',
                  alignItems: 'baseline',
                }}
              >
                <div>
                  <span className="badge badge-orange" style={{ fontSize: '0.74rem' }}>{exp.year}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.08rem', margin: 0 }}>{exp.role}</h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--color-blue)', fontWeight: 600, margin: '2px 0 8px 0' }}>
                    {exp.company}
                  </p>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                    {exp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};
