import React from 'react';
import './GpuCard.css';

const GpuCard = ({ gpu }) => {
  return (
    <div className={`gpu-card ${gpu.available ? 'available' : 'unavailable'}`}>
      <div className="header">
        <h3 className="name">{gpu.name}</h3>
        <p className={`status ${gpu.available ? 'available' : 'unavailable'}`}>
          {gpu.available ? 'Available' : 'Unavailable'}
        </p>
      </div>
      <p className="price">${gpu.price} per hour</p>
    </div>
  );
};

export default GpuCard;