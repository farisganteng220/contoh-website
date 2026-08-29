import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config/siteConfig';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [playlist] = useState(siteConfig.playlist);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(true);
  const [audioFrequencies, setAudioFrequencies] = useState([20, 45, 70, 90, 110, 80, 60, 40, 25]);

  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const progressTimerRef = useRef(null);
  const visualizerTimerRef = useRef(null);

  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  // Initialize Web Audio Engine for synthesized ambient chill tones
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
  };

  const startTone = (frequency) => {
    try {
      initAudio();
      if (!audioCtxRef.current) return;

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch {
          // ignore
        }
      }

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      const filter = audioCtxRef.current.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, audioCtxRef.current.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency || currentTrack.synthNote || 220, audioCtxRef.current.currentTime);

      const targetGain = isMuted ? 0 : volume * 0.15;
      gain.gain.setValueAtTime(0.0001, audioCtxRef.current.currentTime);
      gain.gain.linearRampToValueAtTime(targetGain, audioCtxRef.current.currentTime + 0.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch (e) {
      console.warn("Web Audio engine notice:", e);
    }
  };

  const stopTone = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        const now = audioCtxRef.current.currentTime;
        gainNodeRef.current.gain.cancelScheduledValues(now);
        gainNodeRef.current.gain.linearRampToValueAtTime(0, now + 0.2);
        setTimeout(() => {
          if (oscillatorRef.current) {
            try {
              oscillatorRef.current.stop();
              oscillatorRef.current.disconnect();
            } catch {
              // ignore
            }
          }
        }, 250);
      } catch {
        // ignore
      }
    }
  };

  // Real-time gain update when isMuted or volume state changes
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        const now = audioCtxRef.current.currentTime;
        const targetGain = isMuted ? 0 : volume * 0.15;
        gainNodeRef.current.gain.cancelScheduledValues(now);
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, now);
        gainNodeRef.current.gain.linearRampToValueAtTime(targetGain, now + 0.05);
      } catch (e) {
        console.warn("Gain adjustment notice:", e);
      }
    }
  }, [isMuted, volume]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const handleVolumeChange = (newVal) => {
    const val = Math.max(0, Math.min(1, newVal));
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const playSoundEffect = (type = 'click') => {
    if (isMuted) return; // Silent if muted
    try {
      initAudio();
      if (!audioCtxRef.current) return;
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      const now = audioCtxRef.current.currentTime;

      if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.08 * volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'open') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
        gain.gain.setValueAtTime(0.1 * volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch {
      // Audio effect fallback
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (isPlaying) {
      stopTone();
      setIsPlaying(false);
    } else {
      startTone(currentTrack.synthNote);
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    const nextIdx = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIdx);
    setProgress(0);
    if (isPlaying) {
      startTone(playlist[nextIdx].synthNote);
    }
  };

  const playPrev = () => {
    const prevIdx = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIdx);
    setProgress(0);
    if (isPlaying) {
      startTone(playlist[prevIdx].synthNote);
    }
  };

  const selectTrack = (index) => {
    setCurrentTrackIndex(index);
    setProgress(0);
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTone(playlist[index].synthNote);
  };

  // Animate progress and frequency visualizer when playing
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            playNext();
            return 0;
          }
          return prev + 0.4;
        });
      }, 1000);

      visualizerTimerRef.current = setInterval(() => {
        if (isMuted) {
          setAudioFrequencies([5, 5, 5, 5, 5, 5, 5, 5, 5]);
        } else {
          setAudioFrequencies(
            Array.from({ length: 9 }, () => Math.floor(Math.random() * 80) + 20)
          );
        }
      }, 150);
    } else {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (visualizerTimerRef.current) clearInterval(visualizerTimerRef.current);
      setAudioFrequencies([15, 20, 15, 25, 20, 15, 20, 15, 10]);
    }

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (visualizerTimerRef.current) clearInterval(visualizerTimerRef.current);
    };
  }, [isPlaying, currentTrackIndex, isMuted]);

  return (
    <AudioContext.Provider
      value={{
        playlist,
        currentTrack,
        currentTrackIndex,
        isPlaying,
        volume,
        isMuted,
        progress,
        showMiniPlayer,
        audioFrequencies,
        togglePlay,
        playNext,
        playPrev,
        selectTrack,
        setVolume: handleVolumeChange,
        setIsMuted,
        toggleMute,
        setProgress,
        setShowMiniPlayer,
        playSoundEffect,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
