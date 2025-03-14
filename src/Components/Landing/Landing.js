import React, { useContext } from 'react'
import './Landing.css'
import GpuCard from '../GPUCARD/GpuCard'
import SignUpButton from '../SignUp/SignUp'
import { GpuContext } from '../../Contexts/Gpus/gpuContext'
import Modal from '../SignUp/Modal'

const Landing = () => {


    const {gpuData} = useContext(GpuContext)

  return (
    <div className="vast-ai-landing-page">
    <div className="content-wrapper">
      <div className="header">
        <h1 className="title">Generic CLOUD GPUS</h1>
        <p className="description">Rent high-performance GPUs for your AI projects</p>
      </div>
      <div className="gpu-grid">
        {gpuData.map((gpu) => (
          <GpuCard key={gpu.name} gpu={gpu} />
        ))}
      </div>
      <div className="sign-up-button-wrapper">
        <SignUpButton />
      </div>
    </div>
    <Modal/>
  </div>
  )
}

export default Landing
