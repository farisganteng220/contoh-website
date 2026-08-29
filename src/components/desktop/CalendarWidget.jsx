import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { DecorativeBackground } from '../common/DecorativeBackground';

export const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  // Sample creative events
  const events = [
    { day: 15, title: 'Release New LUTs & Presets', tag: 'Aset' },
    { day: 24, title: 'Video Project Delivery', tag: 'Client' },
    { day: 28, title: 'Live Community Lounge Q&A', tag: 'VIP' },
  ];

  return (
    <div className="os-widget hover-lift" style={{ position: 'relative', overflow: 'hidden' }}>
      <DecorativeBackground variant="micro" scheme="blue" cols={5} rows={4} opacity={0.45} />
      <div className="os-widget-header">
        <span className="os-widget-title">
          <CalendarIcon size={16} className="text-orange" />
          Kalender & Agenda
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button onClick={prevMonth} style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}>
            <ChevronLeft size={16} />
          </button>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, minWidth: '100px', textAlign: 'center' }}>
            {monthNames[month]} {year}
          </span>
          <button onClick={nextMonth} style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Days of week */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          marginBottom: '8px',
        }}
      >
        <span>M</span><span>S</span><span>S</span><span>R</span><span>K</span><span>J</span><span>S</span>
      </div>

      {/* Calendar Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          textAlign: 'center',
          fontSize: '0.8rem',
          fontWeight: 600,
        }}
      >
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} style={{ height: '28px' }} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const isToday = isCurrentMonth && today.getDate() === dayNum;
          const hasEvent = events.some(e => e.day === dayNum);

          return (
            <div
              key={dayNum}
              style={{
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                position: 'relative',
                background: isToday ? 'var(--color-orange)' : 'transparent',
                color: isToday ? '#fff' : 'var(--text-primary)',
                fontWeight: isToday ? 800 : 500,
                cursor: 'pointer',
                boxShadow: isToday ? '0 2px 8px rgba(255, 156, 15, 0.4)' : 'none',
              }}
            >
              {dayNum}
              {hasEvent && !isToday && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'var(--color-blue)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Upcoming Highlight */}
      <div
        style={{
          marginTop: '14px',
          padding: '8px 12px',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-medium)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={14} className="text-orange" />
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Next: {events[0].title}
          </span>
        </div>
        <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
          Tgl {events[0].day}
        </span>
      </div>
    </div>
  );
};
