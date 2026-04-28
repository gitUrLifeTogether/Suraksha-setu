import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('your_key'); // replace with your key

export default function GeminiInsight({ situationData, crisisType }) {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);

  const generateInsight = async () => {
    if (!situationData) return;
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `
        You are an emergency response advisor for a hotel crisis.
        Crisis type: ${crisisType || 'general'}
        Situation: ${situationData.totalVictims} victims, 
        ${situationData.elderlyAbove60} elderly, 
        ${situationData.children} children, 
        ${situationData.medicalRisks} with medical risks.
        Notes: ${situationData.notes || 'none'}
        
        Provide a very short (2 sentences) recommendation for the hotel staff and 112 dispatcher.
      `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setInsight(response.text());
    } catch (error) {
      console.error('Gemini error:', error);
      setInsight('Gemini insight temporarily unavailable. Continue with standard protocol.');
    }
    setLoading(false);
  };

  if (!situationData) return null;

  return (
    <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-green-500 mt-4">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-green-400">🤖 Gemini AI Analysis</h4>
        <button 
          onClick={generateInsight}
          disabled={loading}
          className="bg-green-600 px-3 py-1 rounded text-xs"
        >
          {loading ? 'Analyzing...' : 'Get AI Insight'}
        </button>
      </div>
      {insight && <p className="text-sm mt-2 text-gray-200">{insight}</p>}
    </div>
  );
}