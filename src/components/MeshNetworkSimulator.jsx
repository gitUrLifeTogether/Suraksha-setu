import React, { useState, useEffect } from 'react';
import { Network } from 'lucide-react';

export default function MeshNetworkSimulator() {
  const [relays, setRelays] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setRelays(r => r + Math.floor(Math.random() * 3)), 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-gray-800 rounded-xl p-5">
      <h3 className="font-bold"><Network className="inline text-purple-400" /> Offline-First Mesh Network</h3>
      <div className="mt-2 text-sm">📡 5 nodes active • {relays} messages relayed • No internet required</div>
    </div>
  );
}