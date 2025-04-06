import React from 'react'
import { Server, Zap, Clock } from 'lucide-react';

import './Hero.css'
const Hero = () => {
  return (
    <>
    <section className="hero-section" id="home">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>UNLOCK THE POWER OF</h1>
              <h1 className="text-cyan">CLOUD GPUs</h1>
              <p>
                Access high-performance RTX 4070 GPUs on demand. Perfect for AI, ML 
                training with no setup or maintenance headaches.
              </p>
              <div className="hero-buttons">
                <button className="btn-cyan">GET STARTED</button>
                <button className="btn-outline">LEARN MORE</button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="cloud-container">
                <div className="neon-cloud">
                  <div className="cloud-glow"></div>
                  <Server className="cloud-icon" />
                </div>
                <div className="gpu-card">
                  <span>RTX 4070</span>
                </div>
              </div>
              <div className="gpu-boxes">
                <div className="gpu-box left"></div>
                <div className="gpu-box right"></div>
              </div>
              <div className="power-badge">
                <span>POWERED BY RTX 4070</span>
              </div>
            </div>
          </div>
        </div>
      </section></>
  )
}

export default Hero