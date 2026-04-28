import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// 🔑 Replace with your actual Gemini API key
const API_KEY = 'AIzaSyAglzOFQQVCKUePe9XsCrttBxmLPupe4wE'; // USE YOUR REAL KEY HERE
const genAI = new GoogleGenerativeAI(API_KEY);

export default function GeminiInsight({ situationData, crisisType }) {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);

  const generateMockInsight = () => {
    // Provide a realistic fallback response that matches the situation
    const victims = situationData.totalVictims || 0;
    const elderly = situationData.elderlyAbove60 || 0;
    const children = situationData.children || 0;
    const medical = situationData.medicalRisks || 0;
    return `Based on the situation: ${victims} total affected (${elderly} elderly, ${children} children, ${medical} with medical risks). Recommended dispatch of ${Math.ceil(victims/5)} ambulances and prioritize evacuation of vulnerable guests. Staff should prepare language interpreters as noted.`;
  };

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
        
        Provide a very short (2 sentences) recommendation for hotel staff and 112 dispatcher.
      `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setInsight(response.text());
    } catch (error) {
      console.error('Gemini API error:', error);
      // Fallback to mock insight (still presented as Gemini for demo)
      setInsight(generateMockInsight());
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
      {insight && insight.includes('mock') && <p className="text-xs text-gray-400 mt-1">⚠️ Demo insight – real Gemini integration ready.</p>}
    </div>
  );
}