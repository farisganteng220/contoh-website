import React from 'react';
import { useOS } from '../../context/OSContext';
import { Sparkles, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastNotification = () => {
  const { toasts, removeToast } = useOS();

  if (!toasts.length) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '360px',
        pointerEvents: 'none',
      }}
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="animate-slide-down"
          style={{
            pointerEvents: 'auto',
            background: 'var(--bg-surface-elevated)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid var(--border-medium)',
            borderRadius: '14px',
            padding: '14px 18px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <div
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-md)',
              background:
                toast.type === 'success'
                  ? 'rgba(16, 185, 129, 0.15)'
                  : toast.type === 'warning'
                  ? 'var(--color-orange-subtle)'
                  : 'var(--color-blue-subtle)',
              color:
                toast.type === 'success'
                  ? '#10B981'
                  : toast.type === 'warning'
                  ? 'var(--color-orange)'
                  : 'var(--color-blue)',
            }}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 size={18} />
            ) : toast.type === 'warning' ? (
              <AlertCircle size={18} />
            ) : (
              <Sparkles size={18} />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '2px' }}>{toast.title}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '2px',
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
