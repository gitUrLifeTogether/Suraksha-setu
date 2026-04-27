import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { Shield, Wifi, FileText, Download } from 'lucide-react';
import RoleSelector from './components/RoleSelector';
import GuestView from './components/GuestView';
import DigitalTwinMap from './components/DigitalTwinMap';
import BiasAwareDispatcher from './components/BiasAwareDispatcher';
import MeshNetworkSimulator from './components/MeshNetworkSimulator';
import CrisisLog from './components/CrisisLog';
import StaffAssessment from './components/StaffAssessment';
import NotificationToast from './components/NotificationToast';
import EmergencyView from './components/EmergencyView';
import StaffView from './components/StaffView';

function App() {
  const [role, setRole] = useState('guest');
  const [activeCrisis, setActiveCrisis] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [situationData, setSituationData] = useState(null);
  const [situationReports, setSituationReports] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const volunteers = [
    { id: 1, name: 'John (Security)', role: 'security' },
    { id: 2, name: 'Sarah (Front Desk)', role: 'coordinator' },
    { id: 3, name: 'Mike (Housekeeping)', role: 'cpr_trained' },
  ];

  // Real‑time listeners from Firestore
  useEffect(() => {
    const incidentsQuery = query(collection(db, 'incidents'), orderBy('timestamp', 'desc'));
    const unsubscribeIncidents = onSnapshot(incidentsQuery, (snapshot) => {
      const incidentsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIncidents(incidentsList);
      setEmergencyAlerts(incidentsList);
    });

    const reportsQuery = query(collection(db, 'situationReports'), orderBy('timestamp', 'desc'));
    const unsubscribeReports = onSnapshot(reportsQuery, (snapshot) => {
      const reportsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSituationReports(reportsList);
    });

    return () => {
      unsubscribeIncidents();
      unsubscribeReports();
    };
  }, []);

  const addAlertForStaff = async (crisis) => {
    const newCrisis = { ...crisis, timestamp: new Date().toISOString() };
    try {
      const docRef = await addDoc(collection(db, 'incidents'), newCrisis);
      newCrisis.id = docRef.id;
    } catch (e) {
      console.error("Firestore save error:", e);
      // Fallback: keep locally
    }
    setActiveCrisis(newCrisis);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleSituationUpdate = async (situation) => {
    if (activeCrisis) {
      const report = {
        ...situation,
        crisisId: activeCrisis.id,
        crisisType: activeCrisis.type,
        timestamp: new Date().toISOString()
      };
      try {
        await addDoc(collection(db, 'situationReports'), report);
      } catch (e) {
        console.error("Failed to save report:", e);
      }
      setSituationData(situation);
      const updatedCrisis = { ...activeCrisis, situation };
      setActiveCrisis(updatedCrisis);
    }
  };

  const downloadReports = () => {
    const dataStr = JSON.stringify({ situationReports, emergencyAlerts }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crisis_reports_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Guest view
  if (role === 'guest') {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-gray-800 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3"><Shield className="w-8 h-8 text-red-500" /><h1 className="text-2xl font-bold">SurakshaSetu</h1><span className="bg-red-600 text-xs px-2 py-1 rounded-full">Guest</span></div>
          <RoleSelector role={role} setRole={setRole} />
        </header>
        <main className="p-6"><GuestView setActiveCrisis={setActiveCrisis} addAlertForStaff={addAlertForStaff} /></main>
      </div>
    );
  }

  // 112 view
  if (role === 'emergency') {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-gray-800 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3"><Shield className="w-8 h-8 text-red-500" /><h1 className="text-2xl font-bold">SurakshaSetu</h1><span className="bg-blue-600 text-xs px-2 py-1 rounded-full">112 Dispatch</span></div>
          <RoleSelector role={role} setRole={setRole} />
        </header>
        <main className="p-6"><EmergencyView alerts={emergencyAlerts} /></main>
      </div>
    );
  }

  // Staff view
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NotificationToast alerts={emergencyAlerts} onClose={() => setShowToast(false)} />
      <header className="bg-gray-800 px-6 py-4 flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-3"><Shield className="w-8 h-8 text-red-500" /><h1 className="text-2xl font-bold">SurakshaSetu</h1><span className="bg-blue-600 text-xs px-2 py-1 rounded-full">Staff</span></div>
        <div className="flex gap-2"><button onClick={downloadReports} className="bg-gray-700 px-3 py-1 rounded text-sm flex items-center gap-1"><Download className="w-4 h-4" /> Export Logs</button><RoleSelector role={role} setRole={setRole} /></div>
      </header>
      <main className="p-6">
        <StaffView
          activeCrisis={activeCrisis}
          setActiveCrisis={setActiveCrisis}
          volunteers={volunteers}
          incidents={incidents}
          onAddVictim={handleSituationUpdate}
          situationData={situationData}
        />
        {situationReports.length > 0 && (
          <div className="mt-6 bg-gray-800 rounded-xl p-4">
            <h3 className="font-bold flex items-center gap-2"><FileText className="w-5 h-5 text-blue-400" /> Situation Reports Sent to 112 (Cloud)</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto mt-2">
              {situationReports.map((r, idx) => (
                <div key={idx} className="border-l-2 border-blue-500 pl-3 py-1 text-sm">
                  {r.crisisType?.toUpperCase()} - {r.totalVictims} victims, elderly:{r.elderlyAbove60}, children:{r.children}, medical:{r.medicalRisks}
                  {r.hasMobility ? ' 🚨 mobility' : ''} {r.hasLanguage ? ' 🌐 lang' : ''}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-800 rounded-lg p-4"><div className="flex justify-center gap-2 text-2xl font-bold text-green-400"><Wifi className="w-5 h-5" />Mesh Active</div><div className="text-sm">5 nodes | 3 paths</div></div>
          <div className="bg-gray-800 rounded-lg p-4"><div className="text-2xl font-bold text-purple-400">~0.4s</div><div className="text-sm">Avg response time</div></div>
        </div>
      </main>
    </div>
  );
}

export default App;