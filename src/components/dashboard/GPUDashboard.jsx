import React, { useState, useEffect } from 'react';
import GPUCard from './GPU_CARD/GpuCard';
import './GPUDashboard.css';

// Import sample data to use as fallback

const GPUDashboard = () => {
  const [gpuData, setGpuData] = useState([]);
  const [status, setStatus] = useState('Connecting...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to connect to WebSocket
    const ws = new WebSocket('wss://api.indiegpu.com/ws/send_status');
    
    ws.onopen = () => {
      setStatus('Connected');
    };
    
    ws.onmessage = (event) => {
      try {
        const receivedData = JSON.parse(event.data);
        setGpuData(receivedData);
        setLoading(false);
      } catch (e) {
        console.error("Error parsing data", e);
        // Fallback to sample data if parsing fails
        setGpuData(sampleData);
        setLoading(false);
      }
    };
    
    ws.onclose = () => {
      setStatus("Disconnected");
      // Fallback to sample data if connection closes
      if (gpuData.length === 0) {
        setGpuData(sampleData);
        setLoading(false);
      }
    };
    
    ws.onerror = () => {
      setStatus("Error on the websocket");
      // Fallback to sample data on error
      setGpuData(sampleData);
      setLoading(false);
    };

    // Set a timeout to use sample data if connection takes too long
    const timeout = setTimeout(() => {
      if (loading) {
        setGpuData(sampleData);
        setLoading(false);
        setStatus("Using local data (connection timeout)");
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
      ws.close();
    };
  }, []);

  return (
    <div className="gpu-dashboard">
      <div className="dashboard-header">
        <h1>GPU System Monitor</h1>
        <div className="connection-status">
          Status: <span className={`status-indicator ${status === 'Connected' ? 'connected' : 'disconnected'}`}>{status}</span>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <p>Loading GPU data...</p>
        </div>
      ) : (
        <div className="gpu-card-grid">
          {gpuData.map((gpu) => (
            <GPUCard key={gpu.id} gpu={gpu} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GPUDashboard;