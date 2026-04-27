import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

export default function VoicePanicDetector({ setActiveCrisis }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [volume, setVolume] = useState(0);
  const [status, setStatus] = useState('idle'); // idle, listening, processing, triggered
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // Request microphone and show volume meter
  const startVolumeMeter = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const updateVolume = () => {
        if (!listening) return;
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        let avg = sum / dataArray.length;
        let percent = Math.min(100, (avg / 255) * 100);
        setVolume(percent);
        requestAnimationFrame(updateVolume);
      };
      updateVolume();
      audioContext.resume();
    } catch (err) {
      console.error("Microphone error:", err);
      setStatus("Microphone access denied");
    }
  };

  const stopVolumeMeter = () => {
    if (audioContextRef.current) audioContextRef.current.close();
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    setVolume(0);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setStatus("Speech recognition not supported. Use Chrome.");
      return;
    }
    startVolumeMeter();
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;  // keep listening
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
      setListening(true);
      setStatus('listening');
      setTranscript('');
    };
    
    recognition.onresult = (event) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) final += text;
        else interim += text;
      }
      const fullText = final || interim;
      setTranscript(fullText);
      
      // Panic keyword detection (simple but effective for demo)
      const lower = fullText.toLowerCase();
      const panicWords = ['help', 'fire', 'emergency', 'heart attack', 'bleeding', 'shooting', 'fight', 'can\'t breathe', 'attack', '911'];
      const detected = panicWords.some(word => lower.includes(word));
      
      if (detected && listening) {
        setStatus('triggered');
        let crisisType = 'voice_panic';
        if (lower.includes('fire')) crisisType = 'fire';
        else if (lower.includes('medical') || lower.includes('heart') || lower.includes('bleeding')) crisisType = 'medical';
        else if (lower.includes('shooting') || lower.includes('attack')) crisisType = 'violence';
        
        setActiveCrisis({
          id: Date.now(),
          type: crisisType,
          severity: 0.95,
          timestamp: new Date().toISOString(),
          location: { floor: 'unknown' },
          affected: [{ name: 'Caller', language: 'en', mobility: 'unknown' }],
          transcript: fullText
        });
        // Stop listening after trigger
        recognition.stop();
        stopVolumeMeter();
        setListening(false);
        setTimeout(() => setStatus('idle'), 2000);
      }
    };
    
    recognition.onerror = (event) => {
      console.error("Recognition error", event.error);
      setStatus(`Error: ${event.error}`);
      setListening(false);
      stopVolumeMeter();
    };
    
    recognition.onend = () => {
      if (listening) {
        // Only restart if we didn't trigger a crisis
        setListening(false);
        stopVolumeMeter();
        setStatus('idle');
      }
    };
    
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
    stopVolumeMeter();
    setStatus('idle');
    setTranscript('');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
      stopVolumeMeter();
    };
  }, []);

  return (
    <div className="bg-gray-800 rounded-xl p-5 border-l-4 border-yellow-500">
      <div className="flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2">
          {listening ? <Mic className="text-red-500 animate-pulse" /> : <Mic className="text-yellow-500" />}
          Voice Panic Detection
          {volume > 0 && <Volume2 className="w-4 h-4 text-green-400" />}
        </h3>
        {listening ? (
          <button onClick={stopListening} className="bg-red-600 px-4 py-2 rounded-lg text-sm">
            <MicOff className="inline mr-1 w-4" /> Stop
          </button>
        ) : (
          <button onClick={startListening} className="bg-green-600 px-4 py-2 rounded-lg text-sm">
            <Mic className="inline mr-1 w-4" /> Start Listening
          </button>
        )}
      </div>
      
      {/* Volume meter */}
      {listening && (
        <div className="mt-3">
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-100"
              style={{ width: `${volume}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-1 flex justify-between">
            <span>Mic active</span>
            <span>{Math.round(volume)}% volume</span>
          </p>
        </div>
      )}
      
      {/* Status and transcript */}
      <div className="mt-3">
        <div className="text-sm">
          Status: 
          <span className={`ml-1 font-medium ${
            status === 'listening' ? 'text-green-400' : 
            status === 'triggered' ? 'text-red-400' : 'text-gray-400'
          }`}>
            {status === 'idle' ? 'Ready' : 
             status === 'listening' ? '🔊 Listening for panic words...' :
             status === 'triggered' ? '🚨 CRISIS TRIGGERED!' :
             status}
          </span>
        </div>
        {transcript && (
          <div className="mt-2 p-2 bg-gray-700 rounded text-sm">
            <span className="text-gray-400">Heard: </span>
            "{transcript}"
          </div>
        )}
      </div>
      
      <div className="mt-2 text-xs text-gray-500 border-t border-gray-700 pt-2">
        🎤 Say: "help", "fire", "emergency", "heart attack", "bleeding", "shooting" to trigger a crisis.
      </div>
    </div>
  );
}