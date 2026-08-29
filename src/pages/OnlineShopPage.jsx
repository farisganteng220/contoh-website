import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import {
  Store,
  ShoppingBag,
  Sparkles,
  ExternalLink,
  PackageCheck,
  Star,
  Zap,
  Truck,
  ShieldCheck,
} from 'lucide-react';

export const OnlineShopPage = () => {
  const { isMobile } = useOS();
  return (
    <WindowFrame title="Online Shop & Marketplace Hub" icon={Store} badgeText="Digital & Merch">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        {/* Header Hero */}
        <div
          className="glass-card"
          style={{
            padding: '32px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-orange" style={{ fontSize: isMobile ? '0.65rem' : '0.72rem' }}>Official Merchant Hub</span>
              <span className="badge badge-blue" style={{ fontSize: isMobile ? '0.65rem' : '0.72rem' }}>Verified Stores</span>
            </div>
            <h1 style={{ fontSize: isMobile ? '1.35rem' : '1.9rem', marginBottom: '6px', lineHeight: '1.2' }}>
              Vantara <span className="text-gradient">Marketplace & Merch Stores</span>
            </h1>
            <p style={{ maxWidth: '640px', margin: 0 }}>
              Pusat pembelian resmi aset digital global di Gumroad & Lemon Squeezy, serta merchandise fisik streetwear OS edition di Tokopedia & Shopee.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-orange)' }}>
                ⭐ 4.95 / 5.0
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>2,100+ Total Sales</div>
            </div>
          </div>
        </div>

        {/* SECTION: Marketplace Store Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {siteConfig.onlineShopPlatforms.map(shop => (
            <div
              key={shop.id}
              className="glass-card hover-lift"
              style={{
                padding: '28px',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: `2px solid ${shop.color}35`,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '18px',
                      background: shop.color,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 8px 24px ${shop.color}40`,
                    }}
                  >
                    <ShoppingBag size={28} />
                  </div>
                  <span className="badge badge-glass">{shop.itemsCount}</span>
                </div>

                <h3 style={{ fontSize: '1.3rem', marginBottom: '4px' }}>{shop.name}</h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-orange)', fontWeight: 700, marginBottom: '8px' }}>
                  {shop.type}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <span>⭐ {shop.rating}</span>
                  <span>•</span>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>{shop.badge}</span>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '22px' }}>
                  {shop.description}
                </p>
              </div>

              <a
                href={shop.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{
                  background: shop.color,
                  color: '#fff',
                  padding: '12px 20px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  boxShadow: `0 6px 20px ${shop.color}35`,
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <span>Visit {shop.name.split(' ')[0]} Shop</span>
                <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>

        {/* SECTION: Buyer Protection & Benefits */}
        <div className="glass-card" style={{ padding: '24px 30px', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Zap size={24} className="text-orange" />
              <div>
                <h4 style={{ fontSize: '0.95rem', margin: 0 }}>Instant Download</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Link dikirim langsung ke email</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={24} className="text-blue" />
              <div>
                <h4 style={{ fontSize: '0.95rem', margin: 0 }}>100% Original Assets</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Kualitas master file 4K & vector</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Truck size={24} className="text-orange" />
              <div>
                <h4 style={{ fontSize: '0.95rem', margin: 0 }}>Packing Aman & Cepat</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Pengiriman merch ke seluruh Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};
