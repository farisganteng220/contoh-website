import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import {
  Film,
  Image,
  PenTool,
  Sparkles,
  Clock,
  CheckCircle2,
  Send,
  MessageCircle,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const CommissionPage = () => {
  const { isMobile } = useOS();
  return (
    <WindowFrame title="Commission Editing Services" icon={Film} badgeText="Open for Orders">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        {/* Header Hero */}
        <div
          className="glass-card"
          style={{
            padding: isMobile ? '24px 18px' : '32px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: isMobile ? '16px' : '24px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-orange" style={{ fontSize: isMobile ? '0.65rem' : '0.72rem' }}>Freelance Commission</span>
              <span className="badge badge-blue" style={{ fontSize: isMobile ? '0.65rem' : '0.72rem' }}>Fast Turnaround</span>
            </div>
            <h1 style={{ fontSize: isMobile ? '1.35rem' : '1.9rem', marginBottom: '8px', lineHeight: '1.2' }}>
              Professional <span className="text-gradient">Editing & Creative Services</span>
            </h1>
            <p style={{ maxWidth: '640px', margin: 0 }}>
              Tingkatkan kualitas konten video media sosial, foto produk, atau branding bisnis Anda dengan sentuhan visual cinematic dan pacing memukau.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary-orange hover-lift"
            >
              <MessageCircle size={17} />
              <span>Order via WhatsApp</span>
            </a>
            <a
              href={siteConfig.contact.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary-blue hover-lift"
            >
              <Send size={17} />
              <span>Order via Telegram</span>
            </a>
          </div>
        </div>

        {/* SECTION: Commission Packages Grid */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <Sparkles size={20} className="text-orange" />
            <h2 style={{ fontSize: isMobile ? '1.15rem' : '1.4rem', margin: 0, lineHeight: '1.3' }}>Pilihan Layanan Commission</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
            {siteConfig.commissionServices.map(srv => (
              <div
                key={srv.id}
                className={`glass-card hover-lift ${srv.popular ? 'border-highlight' : ''}`}
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  border: srv.popular ? '2px solid var(--color-orange)' : '1px solid var(--border-medium)',
                }}
              >
                {srv.popular && (
                  <span
                    className="badge badge-orange"
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '20px',
                      boxShadow: '0 4px 12px rgba(255, 156, 15, 0.4)',
                    }}
                  >
                    🔥 Paling Populer
                  </span>
                )}

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="badge badge-glass" style={{ fontSize: '0.72rem' }}>{srv.category}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <Clock size={13} className="text-orange" />
                      <span>{srv.turnaround}</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{srv.title}</h3>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-orange)', marginBottom: '12px' }}>
                    {srv.startingPrice}
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '18px' }}>
                    {srv.description}
                  </p>

                  {/* Inclusions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Yang Anda Dapatkan:
                    </span>
                    {srv.inclusions.map((inc, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem' }}>
                        <CheckCircle2 size={16} className="text-orange" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ color: 'var(--text-primary)' }}>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Halo%20Alex%2C%20saya%20tertarik%20untuk%20order%20commission%20layanan%20${encodeURIComponent(srv.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${srv.popular ? 'btn-primary-orange' : 'btn-glass'} btn-sm`}
                  style={{ width: '100%' }}
                >
                  <span>Start Commission</span>
                  <ChevronRight size={15} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: Step-by-Step Cara Pemesanan */}
        <div className="glass-card" style={{ padding: '28px 32px', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <ShieldCheck size={22} className="text-blue" />
            <h2 style={{ fontSize: '1.35rem', margin: 0 }}>Cara Pemesanan & Alur Kerja</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
            {[
              { step: '01', title: 'Pilih Layanan & Konsultasi', desc: 'Pilih jenis commission dan diskusikan ide, referensi, serta deadline via WhatsApp / Telegram.' },
              { step: '02', title: 'Kirim Bahan & Brief', desc: 'Unggah footage rekaman, foto RAW, atau panduan logo melalui Google Drive / Dropbox.' },
              { step: '03', title: 'Proses Editing & Review', desc: 'Pengerjaan dimulai dengan preview draft pertama. Anda berhak mendapatkan revisi hingga puas.' },
              { step: '04', title: 'Final Master Delivery', desc: 'Pengiriman file resolusi tinggi (4K/ProRes/TIFF/Vector) siap publikasi beserta lisensi komersial.' },
            ].map(flow => (
              <div
                key={flow.step}
                style={{
                  background: 'var(--bg-surface)',
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-medium)',
                }}
              >
                <div
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-orange)',
                    marginBottom: '8px',
                  }}
                >
                  {flow.step}
                </div>
                <h4 style={{ fontSize: '1rem', marginBottom: '6px' }}>{flow.title}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                  {flow.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: Ketentuan & Garansi */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px 24px',
            background: 'var(--color-orange-subtle)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(255, 156, 15, 0.3)',
          }}
        >
          <AlertCircle size={28} className="text-orange" style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ fontSize: '0.96rem', margin: '0 0 2px 0', color: 'var(--color-orange)' }}>
              Ketentuan Garansi Kepuasan Klien
            </h4>
            <p style={{ fontSize: '0.84rem', margin: 0, color: 'var(--text-primary)' }}>
              Setiap order mencakup garansi revisi minor gratis hingga 3x, backup master file di cloud selama 60 hari, dan kerahasiaan materi proyek sebelum tanggal rilis Anda.
            </p>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};
