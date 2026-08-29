import React, { useState, useRef, useEffect } from 'react';
import { WindowFrame } from '../components/common/WindowFrame';
import { Lightbox } from '../components/common/Lightbox';
import { useOS } from '../context/OSContext';
import { useAudio } from '../context/AudioContext';
import confetti from 'canvas-confetti';
import {
  Camera,
  RefreshCw,
  Sparkles,
  Download,
  Sliders,
  Maximize2,
  Video,
  Sun,
  SwitchCamera,
  Zap,
  ZapOff,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Eye,
  CameraOff,
} from 'lucide-react';

export const CameraPage = () => {
  const { isMobile, addToast } = useOS();
  const { playSoundEffect } = useAudio();
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [selectedFilter, setSelectedFilter] = useState('none');
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState('user'); // 'user' (front) | 'environment' (back)
  const [cameraError, setCameraError] = useState(null);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [flashAnimation, setFlashAnimation] = useState(false);
  const [activeLightbox, setActiveLightbox] = useState(null);

  const filters = [
    { id: 'none', name: 'Normal', css: 'none' },
    { id: 'cyberpunk', name: 'Cyberpunk', css: 'contrast(130%) saturate(180%) hue-rotate(190deg)' },
    { id: 'retro', name: 'Retro VHS', css: 'sepia(40%) contrast(120%) brightness(95%)' },
    { id: 'monolith', name: 'B&W Film', css: 'grayscale(100%) contrast(150%) brightness(90%)' },
    { id: 'sunset', name: 'Sunset Glow', css: 'saturate(200%) hue-rotate(-20deg) contrast(110%)' },
  ];

  const currentFilterObj = filters.find(f => f.id === selectedFilter) || filters[0];

  // Function to start camera device stream
  const startCamera = async (facing = cameraFacing) => {
    try {
      setCameraError(null);
      // Stop previous stream if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Browser Anda tidak mendukung akses kamera langsung.");
      }

      const constraints = {
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }

      setIsCameraActive(true);
      addToast('Kamera Aktif', `Kamera perangkat (${facing === 'user' ? 'Depan' : 'Belakang'}) siap digunakan.`, 'success');
    } catch (err) {
      console.warn("Camera access error:", err);
      setIsCameraActive(false);
      setCameraError(err.message || 'Izin kamera ditolak atau perangkat tidak terdeteksi.');
      addToast('Izin Kamera', 'Silakan izinkan akses kamera di browser Anda untuk mengaktifkan video.', 'warning');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    addToast('Kamera Dimatikan', 'Sesi kamera telah ditutup.', 'info');
  };

  const toggleFacingMode = () => {
    const nextFacing = cameraFacing === 'user' ? 'environment' : 'user';
    setCameraFacing(nextFacing);
    if (isCameraActive) {
      startCamera(nextFacing);
    }
  };

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const takeSnapshot = () => {
    // Flash animation and shutter sound
    setFlashAnimation(true);
    playSoundEffect('click');
    setTimeout(() => setFlashAnimation(false), 200);

    confetti({ particleCount: 50, spread: 60 });
    addToast('Foto Berhasil Diambil!', 'Snapshot dengan filter berhasil disimpan.', 'success');

    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (isCameraActive && videoRef.current) {
        ctx.filter = currentFilterObj.css;
        if (cameraFacing === 'user') {
          // Mirror for front camera
          ctx.translate(640, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(videoRef.current, 0, 0, 640, 480);
      } else {
        // Fallback creative photo card
        ctx.fillStyle = '#040200';
        ctx.fillRect(0, 0, 640, 480);
        ctx.filter = currentFilterObj.css;
        ctx.fillStyle = '#FF9C0F';
        ctx.font = 'bold 36px Syne';
        ctx.fillText('Pixel 16 Creative Shot', 80, 240);
        ctx.fillStyle = '#0052F5';
        ctx.font = '20px Outfit';
        ctx.fillText(`Filter: ${currentFilterObj.name}`, 80, 280);
      }
      const dataUrl = canvas.toDataURL('image/png');
      setCapturedPhoto(dataUrl);
    }
  };

  // ==========================================
  // MOBILE VIEW: Google Pixel Camera UI (Redesigned)
  // ==========================================
  if (isMobile) {
    return (
      <WindowFrame title="Pixel Camera" icon={Camera} badgeText="Android 16">
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '0' }}>

          {/* ── TOP CONTROL BAR ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px 8px',
              gap: '8px',
            }}
          >
            {/* Flash toggle */}
            <button
              onClick={() => setFlashEnabled(prev => !prev)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: flashEnabled ? 'var(--color-orange)' : 'var(--bg-card)',
                border: '1px solid var(--border-medium)',
                color: flashEnabled ? '#fff' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              {flashEnabled ? <Zap size={17} /> : <ZapOff size={17} />}
            </button>

            {/* Status badge center */}
            <span
              className="badge badge-orange"
              style={{ fontSize: '0.68rem', letterSpacing: '0.04em', flex: 1, justifyContent: 'center' }}
            >
              {isCameraActive
                ? `🟢 ${cameraFacing === 'user' ? 'Kamera Depan' : 'Kamera Belakang'}`
                : '⚪ Standby'}
            </span>

            {/* Flip camera */}
            <button
              onClick={toggleFacingMode}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              title="Flip Camera"
            >
              <SwitchCamera size={17} />
            </button>
          </div>

          {/* ── VIEWFINDER ── */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4/3',
              borderRadius: '18px',
              overflow: 'hidden',
              background: '#000',
              border: '2px solid rgba(255, 156, 15, 0.35)',
              margin: '0 0 10px',
            }}
          >
            {/* Flash overlay */}
            {flashAnimation && (
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: '#FFFFFF',
                  zIndex: 200,
                  animation: 'fadeIn 0.1s ease-out',
                }}
              />
            )}

            {/* Grid guide overlay (subtle) */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 5,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '33.33% 33.33%',
              pointerEvents: 'none',
            }} />

            {isCameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: currentFilterObj.css,
                  transform: cameraFacing === 'user' ? 'scaleX(-1)' : 'none',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%', height: '100%',
                  position: 'relative',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  padding: '24px', textAlign: 'center',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80"
                  alt="Camera Preview"
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    filter: currentFilterObj.css,
                    opacity: 0.5,
                  }}
                />
                <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '60px', height: '60px',
                      borderRadius: '50%',
                      background: 'var(--color-orange)',
                      color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Camera size={28} />
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '1.05rem', margin: 0, fontWeight: 700 }}>Siap Mengambil Foto</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.78rem', margin: 0, maxWidth: '220px' }}>
                    Ketuk tombol untuk nyalakan kamera perangkat.
                  </p>
                  {cameraError && (
                    <div style={{ background: 'rgba(239,68,68,0.85)', borderRadius: '10px', padding: '8px 12px', fontSize: '0.72rem', color: '#fff', maxWidth: '240px', textAlign: 'center' }}>
                      {cameraError}
                    </div>
                  )}
                  <button
                    onClick={() => startCamera(cameraFacing)}
                    className="btn btn-primary-orange btn-sm btn-press"
                    style={{ marginTop: '4px' }}
                  >
                    <Sparkles size={14} />
                    <span>Nyalakan Kamera</span>
                  </button>
                </div>
              </div>
            )}

            {/* Filter name overlay — top left */}
            <div
              style={{
                position: 'absolute', top: '10px', left: '10px',
                background: 'rgba(4,2,0,0.72)',
                backdropFilter: 'blur(8px)',
                color: 'var(--color-orange)',
                padding: '3px 9px',
                borderRadius: '999px',
                fontSize: '0.68rem', fontWeight: 800,
                zIndex: 10,
              }}
            >
              {currentFilterObj.name}
            </div>

            {/* Stop camera button — top right when active */}
            {isCameraActive && (
              <button
                onClick={stopCamera}
                style={{
                  position: 'absolute', top: '10px', right: '10px',
                  background: 'rgba(239,68,68,0.88)',
                  color: '#fff', border: 'none',
                  borderRadius: '999px',
                  padding: '4px 10px',
                  fontSize: '0.68rem', fontWeight: 700,
                  cursor: 'pointer', zIndex: 10,
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}
              >
                <CameraOff size={12} />
                <span>Stop</span>
              </button>
            )}

            {/* Captured photo preview — bottom left corner */}
            {capturedPhoto && (
              <div
                onClick={() => setActiveLightbox(capturedPhoto)}
                style={{
                  position: 'absolute', bottom: '10px', left: '10px',
                  width: '42px', height: '42px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '2px solid var(--color-orange)',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <img src={capturedPhoto} alt="Last shot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>

          {/* ── FILTER PILLS ── */}
          <div className="filter-pills" style={{ width: '100%', marginBottom: '10px' }}>
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`filter-pill ${selectedFilter === filter.id ? 'active' : ''}`}
                style={{ padding: '5px 12px', fontSize: '0.74rem' }}
              >
                {filter.name}
              </button>
            ))}
          </div>

          {/* ── SHUTTER DECK ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 20px',
              background: 'var(--bg-surface)',
              borderRadius: '20px',
              border: '1px solid var(--border-medium)',
              marginBottom: '4px',
            }}
          >
            {/* Left: Photo thumbnail or placeholder */}
            <div style={{ width: '48px', height: '48px' }}>
              {capturedPhoto ? (
                <img
                  src={capturedPhoto}
                  alt="Last shot"
                  onClick={() => setActiveLightbox(capturedPhoto)}
                  style={{
                    width: '48px', height: '48px',
                    borderRadius: '12px', objectFit: 'cover',
                    border: '2px solid var(--color-orange)',
                    cursor: 'pointer',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '48px', height: '48px',
                    borderRadius: '12px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-medium)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-muted)',
                  }}
                >
                  <ImageIcon size={20} />
                </div>
              )}
            </div>

            {/* Center: Pixel Shutter Button */}
            <button
              onClick={takeSnapshot}
              className="btn-press"
              style={{
                width: '76px', height: '76px',
                borderRadius: '50%',
                background: '#fff',
                padding: '5px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                border: '4px solid var(--color-orange)',
                flexShrink: 0,
              }}
              title="Shutter"
            >
              <div
                style={{
                  width: '58px', height: '58px',
                  borderRadius: '50%',
                  background: 'var(--color-orange)',
                }}
              />
            </button>

            {/* Right: Switch camera */}
            <button
              onClick={toggleFacingMode}
              className="btn-press"
              style={{
                width: '48px', height: '48px',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-medium)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
              title="Switch Camera"
            >
              <SwitchCamera size={22} />
            </button>
          </div>

          {/* ── SAVE STRIP ── */}
          {capturedPhoto && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: 'var(--bg-card)',
                borderRadius: '14px',
                border: '1px solid var(--border-medium)',
                marginTop: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-orange" style={{ fontSize: '0.65rem' }}>✓ Tersimpan</span>
                <span style={{ fontSize: '0.76rem', fontWeight: 600 }}>Foto siap diunduh</span>
              </div>
              <a
                href={capturedPhoto}
                download="pixel-snapshot.png"
                className="btn btn-primary-orange btn-sm"
                style={{ padding: '5px 12px', fontSize: '0.74rem' }}
              >
                <Download size={13} />
                <span>Simpan</span>
              </a>
            </div>
          )}
        </div>

        {/* Lightbox */}
        {activeLightbox && (
          <Lightbox
            isOpen={Boolean(activeLightbox)}
            image={activeLightbox}
            title="Snapshot Foto Saya"
            caption={`Filter: ${currentFilterObj.name} • 640×480`}
            onClose={() => setActiveLightbox(null)}
          />
        )}
      </WindowFrame>
    );
  }


  // ==========================================
  // DESKTOP VIEW: ChromeOS / FydeOS Photo Booth
  // ==========================================
  return (
    <WindowFrame title="Creative Camera Photo Booth" icon={Camera} badgeText="Live Lens">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center' }}>
        {/* Desktop Viewfinder */}
        <div
          className="glass-card"
          style={{
            width: '100%',
            maxWidth: '680px',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            position: 'relative',
            background: '#040200',
            boxShadow: 'var(--shadow-dock)',
            border: '2px solid rgba(255, 156, 15, 0.3)',
          }}
        >
          {flashAnimation && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#FFFFFF',
                zIndex: 200,
                animation: 'fadeIn 0.1s ease-out',
              }}
            />
          )}

          {isCameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '420px',
                objectFit: 'cover',
                filter: currentFilterObj.css,
                transform: cameraFacing === 'user' ? 'scaleX(-1)' : 'none',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80"
                alt="Camera Preset"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: currentFilterObj.css,
                  opacity: 0.65,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--color-orange)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                    boxShadow: '0 4px 18px rgba(255, 156, 15, 0.45)',
                  }}
                >
                  <Camera size={28} />
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '6px' }}>
                  Live Camera Photo Booth
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', maxWidth: '380px', marginBottom: '16px' }}>
                  Nyalakan webcam / kamera perangkat untuk melihat preview wajah Anda secara real-time dengan filter artistik.
                </p>
                <button
                  onClick={() => startCamera(cameraFacing)}
                  className="btn btn-primary-orange hover-lift"
                  style={{ padding: '10px 22px' }}
                >
                  <Sparkles size={16} />
                  <span>Nyalakan Kamera Langsung</span>
                </button>
              </div>
            </div>
          )}

          {/* Filter Watermark Label */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'rgba(4, 2, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              color: 'var(--color-orange)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.78rem',
              fontWeight: 800,
              zIndex: 10,
            }}
          >
            Filter: {currentFilterObj.name}
          </div>

          {isCameraActive && (
            <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px', zIndex: 10 }}>
              <button
                onClick={toggleFacingMode}
                className="btn btn-glass btn-sm"
                style={{ color: '#fff' }}
                title="Switch Camera"
              >
                <SwitchCamera size={14} />
              </button>
              <button
                onClick={stopCamera}
                className="btn btn-sm"
                style={{ background: 'rgba(239, 68, 68, 0.85)', color: '#fff' }}
              >
                <CameraOff size={14} />
                <span>Matikan</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter Pills Selection */}
        <div className="filter-pills">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`filter-pill ${selectedFilter === filter.id ? 'active' : ''}`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Capture Shutter Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={takeSnapshot}
            className="btn btn-primary-orange hover-lift"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              padding: 0,
              boxShadow: 'var(--shadow-glow-orange)',
            }}
            title="Take Snapshot"
          >
            <Camera size={26} />
          </button>
        </div>

        {/* Captured Snapshot Download */}
        {capturedPhoto && (
          <div
            className="glass-card animate-scale-in"
            style={{
              padding: '16px 24px',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              border: '1px solid var(--color-orange)',
            }}
          >
            <img
              src={capturedPhoto}
              alt="Snapshot"
              style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
            />
            <div>
              <h4 style={{ fontSize: '0.95rem', margin: 0 }}>Snapshot Ready!</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Hasil jepretan foto berhasil digenerate.
              </p>
            </div>
            <a
              href={capturedPhoto}
              download="vantara-creative-snapshot.png"
              className="btn btn-primary-orange btn-sm"
            >
              <Download size={14} />
              <span>Download PNG</span>
            </a>
          </div>
        )}
      </div>
    </WindowFrame>
  );
};
