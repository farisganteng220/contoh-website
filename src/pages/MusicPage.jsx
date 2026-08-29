import React, { useState } from 'react';
import { useAudio } from '../context/AudioContext';
import { useOS } from '../context/OSContext';
import { WindowFrame } from '../components/common/WindowFrame';
import { AudioVisualizer } from '../components/audio/AudioVisualizer';
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  ListMusic,
  Shuffle,
  Repeat,
  Heart,
  Share2,
  ChevronDown,
} from 'lucide-react';

export const MusicPage = () => {
  const { isMobile } = useOS();
  const {
    playlist,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    togglePlay,
    playNext,
    playPrev,
    selectTrack,
    progress,
    setProgress,
    volume,
    setVolume,
    isMuted,
    toggleMute,
  } = useAudio();

  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('player'); // 'player' | 'playlist'

  // ==========================================
  // MOBILE VIEW: Android 16 Pixel Media Player
  // ==========================================
  if (isMobile) {
    return (
      <WindowFrame title="Pixel Media & Synthesizer" icon={Music} badgeText="Android 16 Audio">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          {/* Mobile Tab Switcher */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-surface)',
              padding: '4px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-medium)',
              width: '100%',
              maxWidth: '320px',
            }}
          >
            <button
              onClick={() => setActiveTab('player')}
              className={`btn-press ${activeTab === 'player' ? 'badge-orange' : ''}`}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              Now Playing
            </button>
            <button
              onClick={() => setActiveTab('playlist')}
              className={`btn-press ${activeTab === 'playlist' ? 'badge-orange' : ''}`}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              Playlist ({playlist.length})
            </button>
          </div>

          {activeTab === 'player' ? (
            /* Now Playing Mobile Hero */
            <div
              className="glass-card animate-scale-in"
              style={{
                width: '100%',
                padding: '24px 20px',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '18px',
                background: 'var(--bg-surface)',
              }}
            >
              {/* Large Cover Art with Glow */}
              <div
                style={{
                  position: 'relative',
                  width: '240px',
                  height: '240px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: isPlaying && !isMuted
                    ? 'var(--shadow-glow-orange), 0 20px 50px rgba(0,0,0,0.6)'
                    : 'var(--shadow-lg)',
                  border: '3px solid rgba(255, 156, 15, 0.4)',
                }}
              >
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: isPlaying && !isMuted ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform 0.5s ease',
                  }}
                />
              </div>

              {/* Title & Artist & Equalizer */}
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="badge badge-orange" style={{ fontSize: '0.68rem' }}>
                    <Radio size={11} />
                    Android 16 QPR2 Stream
                  </span>
                  {isMuted && (
                    <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: '1px solid #EF4444', fontSize: '0.68rem' }}>
                      MUTED
                    </span>
                  )}
                </div>
                <h2 style={{ fontSize: '1.45rem', margin: '4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentTrack.title}
                </h2>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-orange)', fontWeight: 700, margin: 0 }}>
                  {currentTrack.artist}
                </p>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{currentTrack.album}</span>
              </div>

              {/* Audio Visualizer Waves */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AudioVisualizer barCount={18} height={24} />
              </div>

              {/* Scrubber Progress Bar */}
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    background: 'var(--border-medium)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newProgress = (clickX / rect.width) * 100;
                    setProgress(newProgress);
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: '100%',
                      background: 'var(--color-orange)',
                      borderRadius: '4px',
                      transition: 'width 0.2s linear',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  <span>0:00</span>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>

              {/* Large Round Media Controls */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', width: '100%' }}>
                <button
                  onClick={() => setIsLiked(prev => !prev)}
                  style={{ color: isLiked ? '#EF4444' : 'var(--text-muted)', cursor: 'pointer', padding: '6px' }}
                >
                  <Heart size={20} fill={isLiked ? '#EF4444' : 'none'} />
                </button>

                <button
                  onClick={playPrev}
                  className="btn-press"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <SkipBack size={20} />
                </button>

                <button
                  onClick={togglePlay}
                  className="btn-press"
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--color-orange)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 18px rgba(255, 156, 15, 0.45)',
                  }}
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '4px' }} />}
                </button>

                <button
                  onClick={playNext}
                  className="btn-press"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <SkipForward size={20} />
                </button>

                <button
                  onClick={toggleMute}
                  style={{
                    color: isMuted ? '#EF4444' : 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '50%',
                    background: isMuted ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                  }}
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>

              {/* Volume Slider for Mobile */}
              <div style={{ width: '100%', maxWidth: '240px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={toggleMute} style={{ color: isMuted ? '#EF4444' : 'var(--color-orange)', cursor: 'pointer' }}>
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: isMuted ? '#EF4444' : 'var(--color-orange)' }}
                />
              </div>
            </div>
          ) : (
            /* Mobile Playlist View */
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {playlist.map((track, idx) => {
                const isCurrent = currentTrackIndex === idx;
                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      selectTrack(idx);
                      setActiveTab('player');
                    }}
                    className="glass-card btn-press"
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: isCurrent ? 'var(--color-orange-subtle)' : 'var(--bg-surface)',
                      border: `1px solid ${isCurrent ? 'var(--color-orange)' : 'var(--border-medium)'}`,
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={track.cover}
                        alt={track.title}
                        style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover' }}
                      />
                      <div>
                        <h4 style={{ fontSize: '0.88rem', margin: 0, color: isCurrent ? 'var(--color-orange)' : 'var(--text-primary)' }}>
                          {track.title}
                        </h4>
                        <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0 }}>
                          {track.artist}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {isCurrent && isPlaying && !isMuted && <AudioVisualizer barCount={4} height={14} />}
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{track.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </WindowFrame>
    );
  }

  // ==========================================
  // DESKTOP VIEW: ChromeOS / FydeOS Sound Deck
  // ==========================================
  return (
    <WindowFrame title="OS Music Station & Synthesizer" icon={Music} badgeText="Lo-Fi Soundscapes">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Main Music Deck */}
        <div
          className="glass-card"
          style={{
            padding: '36px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-surface)',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          {/* Vinyl / Cover Artwork */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: isPlaying && !isMuted ? 'var(--shadow-glow-orange), 0 20px 40px rgba(0,0,0,0.5)' : 'var(--shadow-lg)',
                border: '2px solid rgba(255, 156, 15, 0.3)',
              }}
            >
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: isPlaying && !isMuted ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.5s ease',
                }}
              />
            </div>
          </div>

          {/* Current Playing Details & Waveform */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge badge-orange">
                <Radio size={12} />
                Now Streaming
              </span>
              <span className="badge badge-blue">{currentTrack.album}</span>
              {isMuted && (
                <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: '1px solid #EF4444' }}>
                  MUTED
                </span>
              )}
            </div>

            <h1 style={{ fontSize: '2rem', marginBottom: '4px' }}>{currentTrack.title}</h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-orange)', fontWeight: 700, marginBottom: '18px' }}>
              {currentTrack.artist}
            </p>

            {/* Live Audio Visualizer Equalizer */}
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <AudioVisualizer barCount={24} height={32} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {isPlaying ? (isMuted ? 'Audio Output Muted' : '44.1kHz WebAudio Active') : 'Player Paused'}
              </span>
            </div>

            {/* Progress Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>0:00</span>
              <div
                style={{
                  flex: 1,
                  height: '6px',
                  background: 'var(--border-medium)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newProgress = (clickX / rect.width) * 100;
                  setProgress(newProgress);
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'var(--color-orange)',
                    transition: 'width 0.2s linear',
                  }}
                />
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{currentTrack.duration}</span>
            </div>

            {/* Master Control Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
              <button
                onClick={playPrev}
                className="btn btn-glass btn-sm hover-scale"
                style={{ width: '42px', height: '42px', borderRadius: '50%', padding: 0 }}
              >
                <SkipBack size={18} />
              </button>

              <button
                onClick={togglePlay}
                className="btn btn-primary-orange hover-lift"
                style={{ width: '56px', height: '56px', borderRadius: '50%', padding: 0, boxShadow: 'var(--shadow-glow-orange)' }}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '3px' }} />}
              </button>

              <button
                onClick={playNext}
                className="btn btn-glass btn-sm hover-scale"
                style={{ width: '42px', height: '42px', borderRadius: '50%', padding: 0 }}
              >
                <SkipForward size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '16px' }}>
                <button
                  onClick={toggleMute}
                  style={{
                    color: isMuted ? '#EF4444' : 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '6px',
                    borderRadius: 'var(--radius-md)',
                    background: isMuted ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                  }}
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  style={{ width: '100px', accentColor: isMuted ? '#EF4444' : 'var(--color-orange)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Playlist Tracks Selector */}
        <div className="glass-card" style={{ padding: '28px 32px', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ListMusic size={20} className="text-orange" />
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Vantara OS Official Soundscapes</h3>
            </div>
            <span className="badge badge-glass">{playlist.length} Tracks Available</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {playlist.map((track, idx) => {
              const isCurrent = currentTrackIndex === idx;

              return (
                <div
                  key={track.id}
                  onClick={() => selectTrack(idx)}
                  className="btn-press"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-lg)',
                    background: isCurrent ? 'var(--color-orange-subtle)' : 'var(--bg-surface)',
                    border: `1px solid ${isCurrent ? 'var(--color-orange)' : 'var(--border-medium)'}`,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <img src={track.cover} alt={track.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.92rem', margin: 0, color: isCurrent ? 'var(--color-orange)' : 'var(--text-primary)' }}>
                        {track.title}
                      </h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                        {track.artist} • {track.album}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {isCurrent && isPlaying && !isMuted && <AudioVisualizer barCount={6} height={16} />}
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{track.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};
