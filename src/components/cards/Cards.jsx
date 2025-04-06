import React from 'react'
import './Cards.css'
import { Server, Zap, Clock } from 'lucide-react';


const Cards  = () => {
  return (
    <>
        <section className="features-section" id="services">
        <div className="container">
          <div className="section-header">
            <h2 className="text-cyan">WHY CHOOSE INDIEGPU</h2>
            <p>High-performance computing made accessible, affordable, and easy</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <Zap className="feature-icon" />
              <h3>HIGH PERFORMANCE</h3>
              <p>RTX 4070 GPUs with 12GB VRAM deliver exceptional performance for AI training and inference.</p>
            </div>
            
            <div className="feature-card">
              <Clock className="feature-icon" />
              <h3>ON-DEMAND ACCESS</h3>
              <p>Spin up environments in seconds with your choice of PyTorch, TensorFlow, or Jupyter.</p>
            </div>
            
            <div className="feature-card">
              <Server className="feature-icon" />
              <h3>AFFORDABLE PRICING</h3>
              <p>Pay only for what you use with no hidden fees or long-term commitments.</p>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Cards