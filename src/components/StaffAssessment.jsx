import React, { useState } from 'react';
import { ClipboardList, Send, Users, Baby, Heart, AlertTriangle } from 'lucide-react';

export default function StaffAssessment({ activeCrisis, onUpdateSituation }) {
  const [situation, setSituation] = useState({
    totalVictims: 0,
    men: 0,
    women: 0,
    children: 0,
    elderlyAbove60: 0,
    medicalRisks: 0,
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setSituation({ ...situation, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const total = parseInt(situation.totalVictims) || 0;
    if (total === 0) {
      alert("Please enter at least the total number of victims.");
      return;
    }

    // Parse notes for mobility and language keywords
    const notesLow = situation.notes.toLowerCase();
    const hasMobility = notesLow.includes('wheelchair') || 
                        notesLow.includes('walker') || 
                        notesLow.includes('mobility') ||
                        notesLow.includes('crutches') ||
                        notesLow.includes('stretcher');
    
    const hasLanguage = notesLow.includes('spanish') || 
                        notesLow.includes('chinese') || 
                        notesLow.includes('french') ||
                        notesLow.includes('hindi') ||
                        notesLow.includes('german') ||
                        notesLow.includes('russian') ||
                        notesLow.includes('arabic') ||
                        notesLow.includes('japanese');

    const report = {
      totalVictims: total,
      men: parseInt(situation.men) || 0,
      women: parseInt(situation.women) || 0,
      children: parseInt(situation.children) || 0,
      elderlyAbove60: parseInt(situation.elderlyAbove60) || 0,
      medicalRisks: parseInt(situation.medicalRisks) || 0,
      notes: situation.notes,
      hasMobility,
      hasLanguage,
      timestamp: new Date().toISOString()
    };

    onUpdateSituation(report);
    setSubmitted(true);
  };

  if (!activeCrisis) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg text-center text-gray-400">
        No active crisis. Wait for guest alert.
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-gray-800 rounded-xl p-5 border-l-4 border-green-500">
        <div className="flex items-center gap-2 mb-2">
          <ClipboardList className="text-green-400" />
          <h3 className="font-bold">Situation Reported</h3>
        </div>
        <p className="text-sm text-green-300">✓ Report sent to dispatcher and 112.</p>
        <button onClick={() => setSubmitted(false)} className="mt-3 text-xs text-gray-400 underline">
          Edit report
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-5 border-l-4 border-yellow-500">
      <div className="flex items-center gap-2 mb-3">
        <ClipboardList className="text-yellow-400" />
        <h3 className="font-bold">On‑Scene Assessment</h3>
      </div>
      <p className="text-xs text-gray-400 mb-3">
        Staff fills overall situation (not individual victims)
      </p>

      <div className="space-y-3">
        {/* Total victims */}
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4 text-red-400" /> Total number of victims *
          </label>
          <input
            type="number"
            name="totalVictims"
            value={situation.totalVictims}
            onChange={handleChange}
            className="w-full bg-gray-700 p-2 rounded"
            placeholder="e.g., 12"
          />
        </div>

        {/* Demographics grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">👨 Men</label>
            <input
              type="number"
              name="men"
              value={situation.men}
              onChange={handleChange}
              className="w-full bg-gray-700 p-2 rounded"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">👩 Women</label>
            <input
              type="number"
              name="women"
              value={situation.women}
              onChange={handleChange}
              className="w-full bg-gray-700 p-2 rounded"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              <Baby className="inline w-4 h-4" /> Children
            </label>
            <input
              type="number"
              name="children"
              value={situation.children}
              onChange={handleChange}
              className="w-full bg-gray-700 p-2 rounded"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">👵 Elderly (60+)</label>
            <input
              type="number"
              name="elderlyAbove60"
              value={situation.elderlyAbove60}
              onChange={handleChange}
              className="w-full bg-gray-700 p-2 rounded"
              placeholder="0"
            />
          </div>
        </div>

        {/* Medical risks */}
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-400" /> Number with medical risks (heart, asthma, etc.)
          </label>
          <input
            type="number"
            name="medicalRisks"
            value={situation.medicalRisks}
            onChange={handleChange}
            className="w-full bg-gray-700 p-2 rounded"
            placeholder="e.g., 3"
          />
        </div>

        {/* Notes – where staff can mention mobility aids or languages */}
        <div>
          <label className="block text-sm font-medium mb-1">📝 Additional notes</label>
          <textarea
            name="notes"
            value={situation.notes}
            onChange={handleChange}
            className="w-full bg-gray-700 p-2 rounded text-sm"
            rows="3"
            placeholder="Example: 2 people in wheelchairs, 1 Spanish speaker, elderly guest with walker..."
          />
          <p className="text-xs text-gray-400 mt-1">
            * Keywords like "wheelchair", "walker", "Spanish", "Chinese", etc. will increase priority.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded flex items-center justify-center gap-2 transition"
        >
          <Send className="w-4 h-4" /> Send to Dispatcher & 112
        </button>
      </div>
    </div>
  );
}