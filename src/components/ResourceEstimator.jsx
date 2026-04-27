import React from 'react';
import { Ambulance, Truck, Shield } from 'lucide-react';

export default function ResourceEstimator({ situationData }) {
  if (!situationData) return null;
  
  const { totalVictims, elderlyAbove60, children, medicalRisks } = situationData;
  const crisisType = situationData.crisisType || 'general';
  
  // Simple estimation rules
  let ambulances = Math.ceil(medicalRisks / 2) + Math.ceil(totalVictims / 5);
  ambulances = Math.min(5, Math.max(1, ambulances));
  
  let fireTrucks = 0;
  if (crisisType === 'fire') fireTrucks = Math.ceil(totalVictims / 10) + 1;
  else if (totalVictims > 20) fireTrucks = 1;
  
  let policeUnits = Math.ceil(totalVictims / 15) + (crisisType === 'violence' ? 3 : 1);
  policeUnits = Math.min(4, policeUnits);
  
  return (
    <div className="bg-gray-800 rounded-xl p-5 border-t-4 border-purple-500">
      <h3 className="font-bold flex items-center gap-2 mb-3">📋 Resource Dispatch Recommendation</h3>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-gray-700 p-2 rounded">
          <Ambulance className="w-6 h-6 text-red-400 mx-auto" />
          <div className="text-xl font-bold">{ambulances}</div>
          <div className="text-xs">Ambulances</div>
        </div>
        <div className="bg-gray-700 p-2 rounded">
          <Truck className="w-6 h-6 text-orange-400 mx-auto" />
          <div className="text-xl font-bold">{fireTrucks}</div>
          <div className="text-xs">Fire Trucks</div>
        </div>
        <div className="bg-gray-700 p-2 rounded">
          <Shield className="w-6 h-6 text-blue-400 mx-auto" />
          <div className="text-xl font-bold">{policeUnits}</div>
          <div className="text-xs">Police Units</div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2">* Based on victim count, medical risks, and incident type.</p>
    </div>
  );
}