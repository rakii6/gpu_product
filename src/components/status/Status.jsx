import React from 'react'
import './Status.css'

const Status = () => {
  return (
    <>
    <section className="status-section">
        <div className="container">
          <div className="section-header">
            <h2 className="text-cyan">COMING SOON</h2>
            <p>
            I’m in the final testing phase for indiegpu.com,
            my first startup offering RTX 4070 GPU rentals for AI training.
            As a college student, I’m doing this solo—expect a bit of a wait as I perfect it. Stay tuned or DM me to join the beta!


            </p>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '85%'}}>
                <span>85%</span>
              </div>
            </div>
          </div>
          
          <div className="milestones">
            <div className="milestone done">
              <div className="milestone-dot"></div>
              <span>Backend</span>
            </div>
            <div className="milestone done">
              <div className="milestone-dot"></div>
              <span>System Integration</span>
            </div>
            <div className="milestone done">
              <div className="milestone-dot"></div>
              <span>User Portal</span>
            </div>
            <div className="milestone active">
              <div className="milestone-dot"></div>
              <span>Launch</span>
            </div>
          </div>
          <p className="launch-date">Expected launch: April~May 2025</p>
        </div>
      </section>

    </>

  )
}

export default Status