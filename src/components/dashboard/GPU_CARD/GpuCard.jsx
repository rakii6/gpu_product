import React from 'react';
import './GpuCard.css';

const GPUCard = ({ gpu }) => {
  return (
    <div className="gpu-card">
      <div className="gpu-info-section">
        <div className="gpu-index">GPU #{gpu.index}</div>
        <div className="gpu-id">{gpu.id}</div>
        <div className="gpu-status">{gpu.status}</div>
      </div>
      
      <div className="gpu-specs-grid">
        <div className="spec-item">
          <div className="spec-label">CUDA Cores</div>
          <div className="spec-value">{gpu.cuda_cores}</div>
        </div>
        
        <div className="spec-item">
          <div className="spec-label">TFLOPS (FP32)</div>
          <div className="spec-value">{gpu.tflops_fp32}</div>
        </div>
        
        <div className="spec-item">
          <div className="spec-label">Core Clock</div>
          <div className="spec-value">{gpu.clock_speed_mhz} MHz</div>
        </div>
        
        <div className="spec-item">
          <div className="spec-label">Memory Clock</div>
          <div className="spec-value">{gpu.memory_clock_mhz} MHz</div>
        </div>
        
        <div className="spec-item">
          <div className="spec-label">PCIe Gen</div>
          <div className="spec-value">{gpu.pcie_generation}</div>
        </div>
        
        <div className="spec-item">
          <div className="spec-label">PCIe Lanes</div>
          <div className="spec-value">{gpu.pcie_lanes}</div>
        </div>
        
        <div className="spec-item">
          <div className="spec-label">Memory Total</div>
          <div className="spec-value">{gpu.memoryTotal} MB</div>
        </div>
        
        <div className="spec-item">
          <div className="spec-label">Memory Free</div>
          <div className="spec-value">{gpu.memoryFree} MB</div>
        </div>
        
        <div className="spec-item">
          <div className="spec-label">Memory Used</div>
          <div className="spec-value">{gpu.memoryUsed} MB</div>
        </div>
        
        <div className="spec-item">
          <div className="spec-label">Bandwidth</div>
          <div className="spec-value">{gpu.bandwidth_gbs} GB/s</div>
        </div>
        
        <div className="spec-item">
          <div className="spec-label">Bus Width</div>
          <div className="spec-value">{gpu.bus_width_bit} bit</div>
        </div>
        
        <div className="spec-item">
          <div className="spec-label">PCIe RX</div>
          <div className="spec-value">{gpu.pcie_rx_mbs} MB/s</div>
        </div>
        
        <div className="spec-item">
          <div className="spec-label">PCIe TX</div>
          <div className="spec-value">{gpu.pcie_tx_mbs} MB/s</div>
        </div>
      </div>
      
      <div className="rent-section">
        <button className="rent-button">RENT</button>
      </div>
    </div>
  );
};

export default GPUCard;