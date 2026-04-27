import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle, Clock, PhoneCall, PhoneOff } from 'lucide-react';

export default function EmergencyView({ alerts, onRespond }) {
  const [responded, setResponded] = useState({});
  const [calling, setCalling] = useState(null);
  const [callStatus, setCallStatus] = useState({});

  const simulateCall = (alertId) => {
    setCalling(alertId);
    setCallStatus({ ...callStatus, [alertId]: 'calling' });
    // Simulate ringing for 2 seconds, then "connected"
    setTimeout(() => {
      setCallStatus({ ...callStatus, [alertId]: 'connected' });
      setTimeout(() => {
        setCallStatus({ ...callStatus, [alertId]: 'completed' });
        setCalling(null);
      }, 2000);
    }, 2000);
  };

  // Auto-call the latest alert (mock)
  useEffect(() => {
    if (alerts.length > 0 && !callStatus[alerts[0].id]) {
      simulateCall(alerts[0].id);
    }
  }, [alerts]);

  const handleRespond = (id) => {
    setResponded({ ...responded, [id]: true });
    if (onRespond) onRespond(id);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
        <Phone className="text-red-400" /> 112 Dispatch Console
      </h2>
      {alerts.length === 0 ? (
        <p className="text-gray-400">No incoming alerts</p>
      ) : (
        <div className="space-y-3">
          {alerts.map(alert => (
            <div key={alert.id} className="border border-gray-700 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-red-300 uppercase">{alert.type} EMERGENCY</span>
                  <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> {new Date(alert.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div>
                  {!responded[alert.id] ? (
                    <button onClick={() => handleRespond(alert.id)} className="bg-green-600 px-3 py-1 rounded text-sm mr-2">
                      Responding
                    </button>
                  ) : (
                    <span className="text-green-400 flex items-center gap-1 mr-2"><CheckCircle className="w-4 h-4" /> En route</span>
                  )}
                  {!callStatus[alert.id] && (
                    <button onClick={() => simulateCall(alert.id)} className="bg-blue-600 px-3 py-1 rounded text-sm flex items-center gap-1">
                      <PhoneCall className="w-3 h-3" /> Call 112
                    </button>
                  )}
                </div>
              </div>
              {/* Call status */}
              {callStatus[alert.id] && (
                <div className="mt-2 text-xs bg-gray-700 p-2 rounded flex items-center gap-2">
                  {callStatus[alert.id] === 'calling' && <><PhoneCall className="w-3 h-3 animate-pulse text-yellow-400" /> Calling 112...</>}
                  {callStatus[alert.id] === 'connected' && <><PhoneCall className="w-3 h-3 text-green-400" /> Connected – transmitting situation data...</>}
                  {callStatus[alert.id] === 'completed' && <><PhoneOff className="w-3 h-3 text-gray-400" /> Call completed. Help en route.</>}
                </div>
              )}
              {alert.situation && (
                <div className="mt-2 text-xs bg-gray-700 p-2 rounded">
                  <p>Victims: {alert.situation.totalVictims} | Elderly: {alert.situation.elderlyAbove60} | Medical: {alert.situation.medicalRisks}</p>
                  <p className="mt-1 text-gray-300">{alert.situation.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}