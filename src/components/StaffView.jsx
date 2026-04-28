import React from 'react';
import DigitalTwinMap from './DigitalTwinMap';
import BiasAwareDispatcher from './BiasAwareDispatcher';
import MeshNetworkSimulator from './MeshNetworkSimulator';
import CrisisLog from './CrisisLog';
import StaffAssessment from './StaffAssessment';
import ResourceEstimator from './ResourceEstimator';

export default function StaffView({ activeCrisis, setActiveCrisis, volunteers, incidents, onAddVictim, situationData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <DigitalTwinMap activeCrisis={activeCrisis} />
        <MeshNetworkSimulator />
      </div>
      <div className="space-y-6">
        <StaffAssessment activeCrisis={activeCrisis} onUpdateSituation={onAddVictim} />
        <BiasAwareDispatcher activeCrisis={activeCrisis} volunteers={volunteers} situationData={situationData} />
        <ResourceEstimator situationData={situationData} />
        <GeminiInsight situationData={situationData} crisisType={activeCrisis?.type} />
        <CrisisLog incidents={incidents} />
      </div>
    </div>
  );
}