import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, BarChart2, RefreshCcw, Menu } from 'lucide-react';
import './ForecastingModels.css';

const modelOptions = ['ARIMA', 'SARIMA', 'LSTM', 'Prophet'];

const modelData = {
  ARIMA: { MAE: 0.15, RMSE: 0.22, forecast: [100, 110, 105, 115, 120, 118] },
  SARIMA: { MAE: 0.12, RMSE: 0.18, forecast: [102, 112, 108, 118, 122, 120] },
  LSTM: { MAE: 0.10, RMSE: 0.16, forecast: [101, 111, 107, 117, 121, 119] },
  Prophet: { MAE: 0.11, RMSE: 0.17, forecast: [103, 113, 109, 119, 123, 121] },
};

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
    <button onClick={toggleSidebar} className="sidebar-toggle">
      <Menu size={24} />
    </button>
    <nav className="sidebar-nav">
      <ul>
        <li><TrendingUp size={24} />{isOpen && <span>Forecasting Models</span>}</li>
        <li><BarChart2 size={24} />{isOpen && <span>Model Comparison</span>}</li>
        <li><RefreshCcw size={24} />{isOpen && <span>Retrain Models</span>}</li>
      </ul>
    </nav>
  </div>
);

const ForecastingModels = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedModels, setSelectedModels] = useState(['ARIMA', 'SARIMA']);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleModelSelection = (model) => {
    setSelectedModels(prevSelected =>
      prevSelected.includes(model)
        ? prevSelected.filter(m => m !== model)
        : [...prevSelected, model]
    );
  };

  const forecastData = modelOptions.map((model, index) => ({
    name: `Month ${index + 1}`,
    ...Object.fromEntries(modelOptions.map(m => [m, modelData[m].forecast[index]]))
  }));

  const accuracyData = modelOptions.map(model => ({
    name: model,
    MAE: modelData[model].MAE,
    RMSE: modelData[model].RMSE,
  }));

  return (
    <div className="app">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarOpen ? 'content-with-sidebar' : ''}`}>
        <div className="container">
          <h1 className="title">Forecasting Models</h1>
          
          <div className="grid">
            <div className="model-selection">
              <h2>Model Selection</h2>
              <div className="model-options">
                {modelOptions.map(model => (
                  <button
                    key={model}
                    className={`model-option ${selectedModels.includes(model) ? 'selected' : ''}`}
                    onClick={() => toggleModelSelection(model)}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="chart forecast-chart">
              <h2>Forecast Comparison</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }} />
                  <Legend />
                  {selectedModels.map(model => (
                    <Line
                      key={model}
                      type="monotone"
                      dataKey={model}
                      stroke={model === 'ARIMA' ? "#3B82F6" : model === 'SARIMA' ? "#10B981" : model === 'LSTM' ? "#8B5CF6" : "#F59E0B"}
                      strokeWidth={2}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="chart accuracy-chart">
              <h2>Model Accuracy</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }} />
                  <Legend />
                  <Bar dataKey="MAE" fill="#3B82F6" />
                  <Bar dataKey="RMSE" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastingModels;