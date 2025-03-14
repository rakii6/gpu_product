import React from 'react'
import '../Dashboard.css'
const DashCard = () => (
    <>
      <div className="dashboard-card">
        <div className="card-header">
          <h3 className="card-title">Total GPU Hours</h3>
        </div>
        <div className="card-value">
          254 hrs
        </div>
      </div>
      <div className="dashboard-card">
        <div className="card-header">
          <h3 className="card-title">Current GPU Usage</h3>
        </div>
        <div className="card-value">
          2 GPUs
        </div>
      </div>
    </>
  );
export default DashCard
