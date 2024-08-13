import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, PieChart, Home, Box, Layers, BarChart2, Menu } from 'lucide-react';
import './App.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const data = [
  { name: 'Jan', sales: 4000, forecast: 2400, demand: 2400 },
  { name: 'Feb', sales: 3000, forecast: 1398, demand: 2210 },
  { name: 'Mar', sales: 2000, forecast: 9800, demand: 2290 },
  { name: 'Apr', sales: 2780, forecast: 3908, demand: 2000 },
  { name: 'May', sales: 1890, forecast: 4800, demand: 2181 },
  { name: 'Jun', sales: 2390, forest: 3800, demand: 2500 },
];

const regions = [
  { name: 'North', demand: 1200 },
  { name: 'South', demand: 1800 },
  { name: 'East', demand: 2200 },
  { name: 'West', demand: 1600 },
];

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
    <button onClick={toggleSidebar} className="sidebar-toggle">
      <Menu size={24} />
    </button>
    <nav className="sidebar-nav">
      <ul>
        <li><Home size={24} /><Link to="/overview">{isOpen && <span>Overview</span>}</Link></li>
        <li><Box size={24} /><Link to="/product-level-forecasting">{isOpen && <span>Product-Level Forecasting</span>}</Link></li>
        <li><Layers size={24} /><Link to="/inventory-management">{isOpen && <span>Inventory Management</span>}</Link></li>
        <li><BarChart2 size={24} /><Link to="/forecasting-models">{isOpen && <span>Forecasting Models</span>}</Link></li>
      </ul>
    </nav>
  </div>
);

const OverviewDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarOpen ? 'content-with-sidebar' : ''}`}>
        <div className="container">
          <h1 className="title">Overview Dashboard</h1>
          
          <div className="dashboard-content">
            <div className="metrics-column">
              <MetricCard title="Total Sales" value="$1,234,567" icon={<DollarSign />} color="blue-gradient" />
              <MetricCard title="Forecast Accuracy" value="92%" icon={<TrendingUp />} color="green-gradient" />
              <MetricCard title="Current Demand" value="15,678" icon={<Users />} color="purple-gradient" />
            </div>
            
            <div className="chart-column">
              <div className="chart time-series-chart">
                <h2>Time-Series Trends</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }} />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="forecast" stroke="#10B981" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="demand" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="chart bar-chart">
                <h2>Demand Distribution by Region</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={regions}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }} />
                    <Bar dataKey="demand" fill="url(#colorGradient)" />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const MetricCard = ({ title, value, icon, color }) => (
  <div className={`metric-card ${color}`}>
    <div className="metric-header">
      <h2>{title}</h2>
      {icon}
    </div>
    <p className="metric-value">{value}</p>
  </div>
);

export default OverviewDashboard;
