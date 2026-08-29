import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { Lightbox } from '../components/common/Lightbox';
import { useOS } from '../context/OSContext';
import {
  FileText,
  Download,
  Eye,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Layers,
  Palette,
  Type,
  FileCode,
} from 'lucide-react';

export const VisualIdentityPage = () => {
  const { addToast, isMobile } = useOS();
  const [copiedHex, setCopiedHex] = useState(null);
  const [activePreviewDoc, setActivePreviewDoc] = useState(null);

  const brandColors = [
    { name: 'Primary Orange', hex: '#FF9C0F', rgb: 'rgb(255, 156, 15)', role: 'Accent utama, tombol CTA, highlight, icon aktif' },
    { name: 'Primary Blue', hex: '#0052F5', rgb: 'rgb(0, 82, 245)', role: 'Secondary accent, link hover, network & badges' },
    { name: 'Light Mode Background', hex: '#F8F8FF', rgb: 'rgb(248, 248, 255)', role: 'Canvas dasar tema terang (Ghost White)' },
    { name: 'Dark Mode Background', hex: '#040200', rgb: 'rgb(4, 2, 0)', role: 'Canvas dasar tema gelap (Obsidian Black)' },
  ];

  const copyColor = (hex, name) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    addToast('Color Copied!', `${name} (${hex}) tersalin ke clipboard.`, 'success');
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <WindowFrame title="Visual Identity & Brand Assets" icon={FileText} badgeText="Brand Specs v2.5">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        {/* Header Hero */}
        <div
          className="glass-card"
          style={{
            padding: '30px 32px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-orange" style={{ fontSize: isMobile ? '0.65rem' : '0.72rem' }}>Design System</span>
              <span className="badge badge-blue" style={{ fontSize: isMobile ? '0.65rem' : '0.72rem' }}>Official Specification</span>
            </div>
            <h1 style={{ fontSize: isMobile ? '1.3rem' : '1.85rem', marginBottom: '6px', lineHeight: '1.2' }}>
              Vantara <span className="text-gradient">Visual Identity & Guidelines</span>
            </h1>
            <p style={{ maxWidth: '640px', margin: 0 }}>
              Pusat dokumen identitas visual, spesifikasi palet warna resmi, standar hierarki tipografi, dan paket logo vector beresolusi tinggi.
            </p>
          </div>
        </div>

        {/* SECTION: Official Color Palette Tokens (with 1-click Copy) */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <Palette size={isMobile ? 18 : 20} className="text-orange" />
            <h2 style={{ fontSize: isMobile ? '1.15rem' : '1.4rem', margin: 0, lineHeight: '1.3' }}>Official Color Palette & Hex Tokens</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
            {brandColors.map(col => (
              <div
                key={col.hex}
                className="glass-card hover-lift"
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    height: '110px',
                    borderRadius: 'var(--radius-lg)',
                    background: col.hex,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '1.05rem', margin: 0 }}>{col.name}</h3>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '4px 0 10px 0', lineHeight: '1.4' }}>
                    {col.role}
                  </p>

                  <button
                    onClick={() => copyColor(col.hex, col.name)}
                    className="btn btn-glass btn-sm"
                    style={{ width: '100%', justifyContent: 'space-between', fontSize: '0.82rem' }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{col.hex}</span>
                    {copiedHex === col.hex ? <Check size={14} className="text-orange" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: Typography Showcase */}
        <div className="glass-card" style={{ padding: '28px 32px', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Type size={20} className="text-blue" />
            <h2 style={{ fontSize: '1.35rem', margin: 0 }}>Typography & Hierarchy Standards</h2>
          </div>
          <p style={{ marginBottom: '20px', maxWidth: '650px' }}>
            Hierarki tipografi menggunakan font modern <strong>Creato Display</strong>, <strong>Laro Soft Medium</strong>, dan <strong>Outfit / Plus Jakarta Sans</strong>.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-medium)' }}>
              <span className="badge badge-orange" style={{ marginBottom: '8px' }}>Heading Display</span>
              <h2 style={{ fontSize: '1.6rem', margin: '4px 0', fontFamily: 'var(--font-display)' }}>Creato Display Bold</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Digunakan untuk judul hero, nama brand, dan display OS widget.</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-medium)' }}>
              <span className="badge badge-blue" style={{ marginBottom: '8px' }}>Subheading & UI</span>
              <h3 style={{ fontSize: '1.25rem', margin: '4px 0', fontWeight: 700 }}>Laro Soft Medium / Bold</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Digunakan untuk sub-judul, tombol aksi, dan label navigasi.</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-medium)' }}>
              <span className="badge badge-glass" style={{ marginBottom: '8px' }}>Body Copy</span>
              <p style={{ fontSize: '0.95rem', margin: '4px 0', lineHeight: '1.5' }}>Plus Jakarta Sans Regular</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Digunakan untuk paragraf panjang, deskripsi, dan catatan.</p>
            </div>
          </div>
        </div>

        {/* SECTION: Downloadable Brand Identity Documents */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <FileCode size={20} className="text-orange" />
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Brand Guidelines & Asset Files</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {siteConfig.visualIdentityDocs.map(doc => (
              <div
                key={doc.id}
                className="glass-card hover-lift"
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span className="badge badge-orange">{doc.type}</span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{doc.size}</span>
                  </div>

                  <h3 style={{ fontSize: '1.18rem', marginBottom: '6px' }}>{doc.name}</h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '12px' }}>
                    {doc.description}
                  </p>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Updated: {doc.updated}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-medium)', paddingTop: '14px' }}>
                  <button
                    onClick={() => setActivePreviewDoc(doc)}
                    className="btn btn-glass btn-sm"
                    style={{ flex: 1 }}
                  >
                    <Eye size={14} />
                    <span>Preview</span>
                  </button>
                  <a
                    href={doc.previewImg}
                    download={doc.name}
                    className="btn btn-primary-blue btn-sm"
                    style={{ flex: 1 }}
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document Lightbox Preview */}
      {activePreviewDoc && (
        <Lightbox
          isOpen={Boolean(activePreviewDoc)}
          image={activePreviewDoc.previewImg}
          title={activePreviewDoc.name}
          caption={`${activePreviewDoc.type} • ${activePreviewDoc.size} • Last Updated: ${activePreviewDoc.updated}`}
          onClose={() => setActivePreviewDoc(null)}
        />
      )}
    </WindowFrame>
  );
};
