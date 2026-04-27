import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function PanicButton({ setActiveCrisis }) {
  const [pressed, setPressed] = useState(false);
  const handlePanic = () => {
    setPressed(true);
    setActiveCrisis({
      id: Date.now(),
      type: 'manual_panic',
      location: { floor: 2, room: '207' },
      severity: 0.85,
      timestamp: new Date().toISOString(),
      affected: [{ name: 'Guest in distress', language: 'en', mobility: 'full' }]
    });
    setTimeout(() => setPressed(false), 2000);
  };
  return (
    <div className="bg-gray-800 rounded-xl p-5 border-l-4 border-red-500">
      <div className="flex justify-between items-center">
        <h3 className="font-bold"><AlertTriangle className="inline text-red-500" /> Emergency Button</h3>
        <button onClick={handlePanic} className={`px-6 py-3 rounded-lg font-bold ${pressed ? 'bg-red-700' : 'bg-red-600 hover:bg-red-700'}`}>{pressed ? 'ALERT SENT' : 'PANIC'}</button>
      </div>
    </div>
  );
}