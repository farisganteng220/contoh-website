import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import confetti from 'canvas-confetti';
import {
  MessageSquare,
  MessageCircle,
  Send,
  Mail,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export const ContactPage = () => {
  const { addToast, isMobile } = useOS();
  const [userName, setUserName] = useState('');
  const [userInterest, setUserInterest] = useState('Commission Video Editing');
  const [userMessage, setUserMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      addToast('Input Diperlukan', 'Silakan masukkan nama Anda terlebih dahulu.', 'warning');
      return;
    }

    confetti({ particleCount: 60, spread: 60 });
    const fullText = `Halo Alex! Saya ${userName.trim()}.\n\nSaya tertarik mengenai: ${userInterest}.\nPesan: ${userMessage.trim() || 'Saya ingin berdiskusi lebih lanjut.'}`;
    const encoded = encodeURIComponent(fullText);
    const waLink = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encoded}`;

    addToast('Mengalihkan ke WhatsApp', 'Membuka WhatsApp dengan pesan yang sudah Anda susun...', 'success');
    window.open(waLink, '_blank');
  };

  return (
    <WindowFrame title="Contact Creator" icon={MessageSquare} badgeText="Online GMT+7">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        {/* Hero Card */}
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
            <MessageSquare size={isMobile ? 24 : 30} />
          </div>

          <h1 style={{ fontSize: isMobile ? '1.45rem' : '2.1rem', marginBottom: '8px', lineHeight: '1.2' }}>
            “Have a Project or Question? <span className="text-gradient">Let’s Talk.</span>”
          </h1>
          <p style={{ maxWidth: '640px', margin: '0 auto 20px auto', fontSize: '0.96rem' }}>
            Saya selalu terbuka untuk mendiskusikan peluang proyek baru, tawaran kolaborasi kreatif, freelance editing commission, atau sekadar bertukar sapa.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '6px 18px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-medium)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
            <span style={{ fontSize: '0.84rem', fontWeight: 700 }}>Rata-rata Respon: &lt; 2 Jam</span>
          </div>
        </div>

        {/* SECTION: Two Main Direct Contact Channels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* WhatsApp Direct Card */}
          <div
            className="glass-card hover-lift"
            style={{
              padding: '32px',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '2px solid rgba(37, 211, 102, 0.35)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div
                  style={{
                    width: '58px',
                    height: '58px',
                    borderRadius: '18px',
                    background: '#25D366',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
                  }}
                >
                  <MessageCircle size={30} />
                </div>
                <span className="badge" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366' }}>
                  🟢 Online & Active
                </span>
              </div>

              <h2 style={{ fontSize: '1.45rem', marginBottom: '6px' }}>WhatsApp Direct Chat</h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-orange)', fontWeight: 700, marginBottom: '10px' }}>
                +62 812-3456-7890
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '24px' }}>
                Jalur komunikasi tercepat untuk konsultasi brief, negosiasi harga commission editing, dan order instan.
              </p>
            </div>

            <a
              href={siteConfig.contact.whatsappUrl}
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
              <span>Chat via WhatsApp</span>
              <ExternalLink size={15} />
            </a>
          </div>

          {/* Telegram Direct Card */}
          <div
            className="glass-card hover-lift"
            style={{
              padding: '32px',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '2px solid rgba(34, 158, 217, 0.35)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div
                  style={{
                    width: '58px',
                    height: '58px',
                    borderRadius: '18px',
                    background: '#229ED9',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(34, 158, 217, 0.4)',
                  }}
                >
                  <Send size={28} style={{ marginLeft: '-2px' }} />
                </div>
                <span className="badge" style={{ background: 'rgba(34, 158, 217, 0.15)', color: '#229ED9' }}>
                  🟢 Direct Handle
                </span>
              </div>

              <h2 style={{ fontSize: '1.45rem', marginBottom: '6px' }}>Telegram Personal Lounge</h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-blue)', fontWeight: 700, marginBottom: '10px' }}>
                @{siteConfig.contact.telegramUsername}
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '24px' }}>
                Kirim file project ukuran besar tanpa kompresi, proposal kerja sama agency, atau kolaborasi internasional.
              </p>
            </div>

            <a
              href={siteConfig.contact.telegramUrl}
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
              <span>Message on Telegram</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* SECTION: Interactive Message Composer */}
        <div className="glass-card" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Sparkles size={20} className="text-orange" />
            <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Susun Pesan WhatsApp Cepat</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Pilih topik dan tulis pesan Anda di bawah ini, kami akan otomatis memformat dan membukanya di WhatsApp Anda.
          </p>

          <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Nama Lengkap / Brand:
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Rian Pratama"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.92rem',
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Kebutuhan / Minat:
                </label>
                <select
                  value={userInterest}
                  onChange={(e) => setUserInterest(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.92rem',
                  }}
                >
                  <option value="Commission Video Editing (Reels/Shorts/TikTok)">Commission Video Editing</option>
                  <option value="Commission Photo Retouching & Grading">Commission Photo Retouching</option>
                  <option value="Branding & Visual Identity Design">Branding & Visual Identity</option>
                  <option value="Pembelian Aplikasi Premium / Software License">Pembelian Aplikasi Premium</option>
                  <option value="Tawaran Kerjasama / Partnership">Tawaran Kerjasama</option>
                  <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                Deskripsi Singkat / Detail Pesan:
              </label>
              <textarea
                rows="3"
                placeholder="Tuliskan gambaran proyek, referensi video, atau estimasi deadline Anda..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '0.92rem',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary-orange hover-lift"
              style={{ alignSelf: 'flex-start', padding: '12px 28px' }}
            >
              <Send size={16} />
              <span>Generate & Buka di WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </WindowFrame>
  );
};
