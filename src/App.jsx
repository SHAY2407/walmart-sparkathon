import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OverviewDashboard from './OverviewDashboard'; // Ensure this path is correct
import ForecastingModels from './ForecastingModels'; // Ensure this path is correct

function App() {
  return (
    <Routes>
      <Route path="/overview" element={<OverviewDashboard />} />
      <Route path="/forecasting-models" element={<ForecastingModels />} />
      {/* Define other routes as needed */}
    </Routes>
  );
}

export default App;
