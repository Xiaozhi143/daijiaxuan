import { useEffect, useRef, useState } from 'react';

const AmbientSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const lastPlayTimeRef = useRef(0);

  const initAudio = () => {
    if (audioContextRef.current) return;
    
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    setIsInitialized(true);
  };

  const playNote = (frequency: number, duration: number, delay: number) => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, now + delay);
    
    gainNode.gain.setValueAtTime(0, now + delay);
    gainNode.gain.linearRampToValueAtTime(0.08, now + delay + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start(now + delay);
    oscillator.stop(now + delay + duration);
    
    oscillatorsRef.current.push(oscillator);
    gainNodesRef.current.push(gainNode);
  };

  const playMelody = () => {
    const now = Date.now();
    if (now - lastPlayTimeRef.current < 2000) return;
    lastPlayTimeRef.current = now;

    if (!audioContextRef.current) return;

    const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 261.63];
    const randomNotes = [...notes].sort(() => Math.random() - 0.5).slice(0, 4);
    
    randomNotes.forEach((freq, i) => {
      playNote(freq, 2, i * 0.4);
    });
  };

  const handleMouseMove = () => {
    if (!isInitialized) return;
    if (Math.random() > 0.98) {
      playMelody();
    }
  };

  useEffect(() => {
    const handleClick = () => {
      initAudio();
      document.removeEventListener('click', handleClick);
    };
    document.addEventListener('click', handleClick);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isInitialized]);

  return null;
};

export default AmbientSound;
