import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, Baby, Heart } from 'lucide-react';

export default function BiasAwareDispatcher({ activeCrisis, situationData }) {
  const [priority, setPriority] = useState(null);
  
  useEffect(() => {
    if (activeCrisis && situationData && situationData.totalVictims > 0) {
      let score = 0.2;
      if (situationData.elderlyAbove60 > 0) score += 0.3 * Math.min(1, situationData.elderlyAbove60 / 10);
      if (situationData.children > 0) score += 0.25 * Math.min(1, situationData.children / 10);
      if (situationData.medicalRisks > 0) score += 0.4 * Math.min(1, situationData.medicalRisks / 10);
      if (situationData.hasMobility) score += 0.35;
      if (situationData.hasLanguage) score += 0.25;
      if (situationData.totalVictims > 5) score += 0.2;
      const finalScore = Math.min(1.0, score);
      setPriority({ score: finalScore, ...situationData });
    } else {
      setPriority(null);
    }
  }, [situationData, activeCrisis]);

  if (!activeCrisis) return <div className="bg-gray-800 p-4 rounded text-center text-gray-400">No active crisis</div>;
  if (!situationData) return <div className="bg-gray-800 p-4 rounded text-center text-yellow-400">Awaiting staff report...</div>;
  if (!priority) return <div className="bg-gray-800 p-4 rounded text-center">Calculating...</div>;

  return (
    <div className="bg-gray-800 rounded-xl p-5 border-t-4 border-blue-500">
      <h3 className="font-bold flex items-center gap-2">
        <TrendingUp className="text-blue-400" /> Priority Calculator (Demo Policy)
        <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full">Rule‑based</span>
      </h3>
      <div className="mt-3 bg-gray-700 p-3 rounded">
        <div className="text-lg font-bold">Priority Score: {(priority.score * 100).toFixed(0)}%</div>
        <div className="text-sm">{priority.score > 0.7 ? 'IMMEDIATE MASS EVACUATION' : 'STANDARD RESPONSE'}</div>
      </div>
      <div className="mt-3 space-y-1 text-sm">
        <p>Total victims: {situationData.totalVictims}</p>
        <p>👵 Elderly: {situationData.elderlyAbove60} | 👶 Children: {situationData.children}</p>
        <p>💊 Medical risks: {situationData.medicalRisks}</p>
        {situationData.hasMobility && <p>♿ +0.35 (mobility issues detected in notes)</p>}
        {situationData.hasLanguage && <p>🌐 +0.25 (language barrier in notes)</p>}
      </div>
      <div className="text-xs text-gray-400 mt-2 border-t pt-2">
        ⚖️ Demo weights: Elderly +0.3/10, Children +0.25/10, Medical +0.4/10, Mobility +0.35, Language +0.25
      </div>
    </div>
  );
}