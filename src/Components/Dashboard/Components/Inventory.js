import React from 'react'
import '../Dashboard.css'

const Inventory = ({ gpuData }) => (
    <div className="dashboard-card">
      <div className="card-header">
        <h3 className="card-title">GPU Inventory</h3>
      </div>
      <div className="gpu-list">
        {gpuData.map(gpu => (
          <div key={gpu.id} className="gpu-item">
            <span>{gpu.name}</span>
            <span 
              className={`gpu-status ${gpu.status}`}
            >
              {gpu.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
export default Inventory
