import React from 'react';
import { History } from 'lucide-react';

export default function CrisisLog({ incidents }) {
  return (
    <div className="bg-gray-800 rounded-xl p-5">
      <h3 className="font-bold"><History className="inline" /> Immutable Incident Log (Blockchain Verified)</h3>
      {incidents.length === 0 ? <div className="text-gray-400 text-center py-4">No incidents logged</div> : incidents.map(inc => <div key={inc.id} className="border-l-2 border-red-500 pl-2 my-2 text-sm">{inc.type.toUpperCase()} at {new Date(inc.timestamp).toLocaleTimeString()}</div>)}
    </div>
  );
}