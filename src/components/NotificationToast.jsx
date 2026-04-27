import React, { useEffect } from 'react';
import { Bell } from 'lucide-react';

export default function NotificationToast({ alerts, onClose }) {
  const [visible, setVisible] = React.useState(false);
  const [latestAlert, setLatestAlert] = React.useState(null);

  useEffect(() => {
    if (alerts.length > 0) {
      setLatestAlert(alerts[0]);
      setVisible(true);
      // Play a subtle beep
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      oscillator.connect(gain);
      gain.connect(audioCtx.destination);
      oscillator.frequency.value = 660;
      gain.gain.value = 0.3;
      oscillator.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.3);
      oscillator.stop(audioCtx.currentTime + 0.3);
      
      setTimeout(() => setVisible(false), 4000);
    }
  }, [alerts]);

  if (!visible || !latestAlert) return null;

  return (
    <div className="fixed top-20 right-4 z-50 bg-gray-800 border-l-4 border-red-500 rounded-lg shadow-lg p-4 max-w-sm animate-slide-in">
      <div className="flex items-start gap-3">
        <Bell className="text-red-400" />
        <div className="flex-1">
          <p className="font-bold">New Emergency Alert</p>
          <p className="text-sm">{latestAlert.type.toUpperCase()} crisis at {new Date(latestAlert.timestamp).toLocaleTimeString()}</p>
          <button onClick={onClose} className="text-xs text-gray-400 mt-2">Dismiss</button>
        </div>
      </div>
    </div>
  );
}