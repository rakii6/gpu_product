// // GPUDashboard.jsx
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './GPUDashboard.css';

// export default function GPUDashboard() {
//   const [gpuClusters, setGpuClusters] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedEnvironment, setSelectedEnvironment] = useState('pytorch');
//   const navigate = useNavigate();

//   // In a real implementation, this would fetch from your API
//   useEffect(() => {
//     const fetchGPUClusters = async () => {
//       setIsLoading(true);
//       try {
//         // This is mock data - replace with actual API call
//         const mockClusters = [
//           {
//             id: 'cluster-1',
//             gpuCount: 4,
//             gpuType: 'RTX 4070',
//             gpuIds: ['GPU-001', 'GPU-002', 'GPU-003', 'GPU-004'],
//             vram: '12GB',
//             tflops: 325.6,
//             maxCuda: 12.8,
//             totalVram: '48GB',
//             gbps: '901.4 GB/s',
//             motherboard: 'B550M PRO-VDH WIFI',
//             uploadSpeed: '878 Mbps',
//             downloadSpeed: '871 Mbps',
//             ports: 399,
//             location: 'US East',
//             reliability: '99.8%',
//             price: 1.444,
//             status: 'available'
//           },
//           {
//             id: 'cluster-2',
//             gpuCount: 2,
//             gpuType: 'RTX 4070',
//             gpuIds: ['GPU-005', 'GPU-006'],
//             vram: '12GB',
//             tflops: 162.8,
//             maxCuda: 12.8,
//             totalVram: '24GB',
//             gbps: '450.7 GB/s',
//             motherboard: 'B550M PRO-VDH WIFI',
//             uploadSpeed: '765 Mbps',
//             downloadSpeed: '742 Mbps',
//             ports: 249,
//             location: 'US West',
//             reliability: '99.7%',
//             price: 0.720,
//             status: 'available'
//           },
//           {
//             id: 'cluster-3',
//             gpuCount: 1,
//             gpuType: 'RTX 4070',
//             gpuIds: ['GPU-007'],
//             vram: '12GB',
//             tflops: 81.4,
//             maxCuda: 12.8,
//             totalVram: '12GB',
//             gbps: '225.3 GB/s',
//             motherboard: 'B550M PRO-VDH WIFI',
//             uploadSpeed: '525 Mbps',
//             downloadSpeed: '510 Mbps',
//             ports: 125,
//             location: 'India',
//             reliability: '99.9%',
//             price: 0.370,
//             status: 'available'
//           },
//           {
//             id: 'cluster-4',
//             gpuCount: 8,
//             gpuType: 'RTX 4070',
//             gpuIds: ['GPU-008', 'GPU-009', 'GPU-010', 'GPU-011', 'GPU-012', 'GPU-013', 'GPU-014', 'GPU-015'],
//             vram: '12GB',
//             tflops: 651.2,
//             maxCuda: 12.8,
//             totalVram: '96GB',
//             gbps: '1802.8 GB/s',
//             motherboard: 'B550M PRO-VDH WIFI',
//             uploadSpeed: '1035 Mbps',
//             downloadSpeed: '998 Mbps',
//             ports: 650,
//             location: 'Europe',
//             reliability: '98.5%',
//             price: 2.890,
//             status: 'in-use'
//           }
//         ];
        
//         // Simulate API delay
//         setTimeout(() => {
//           setGpuClusters(mockClusters);
//           setIsLoading(false);
//         }, 800);
//       } catch (error) {
//         console.error('Error fetching GPU clusters:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchGPUClusters();
//   }, []);

//   const handleRent = (clusterId) => {
//     // In a real implementation, this would either:
//     // 1. Open login modal if user is not authenticated
//     // 2. Start the rental process if user is authenticated
//     console.log(`Renting cluster ${clusterId} with ${selectedEnvironment} environment`);
    
//     // For demo purposes, navigate to a fake user dashboard
//     navigate('/dashboard/user/123');
//   };

//   const environments = [
//     { id: 'pytorch', name: 'PyTorch', description: 'Deep learning framework with CUDA support' },
//     { id: 'tensorflow', name: 'TensorFlow', description: 'ML platform with GPU acceleration' },
//     { id: 'jupyter', name: 'Jupyter', description: 'Interactive data science notebooks' }
//   ];

//   return (
//     <div className="gpu-dashboard">
//       <div className="dashboard-container">
//         <div className="filter-section">
//           <div className="environment-filters">
//             <span className="filter-label">#GPUs:</span>
//             <div className="filter-buttons">
//               <button className="filter-button">ANY</button>
//               <button className="filter-button">1x</button>
//               <button className="filter-button active">2x</button>
//               <button className="filter-button">4x</button>
//               <button className="filter-button">8x</button>
//             </div>
//           </div>
          
//           <div className="environment-selector">
//             <span className="filter-label">Environment:</span>
//             <select 
//               value={selectedEnvironment}
//               onChange={(e) => setSelectedEnvironment(e.target.value)}
//               className="environment-dropdown"
//             >
//               {environments.map(env => (
//                 <option key={env.id} value={env.id}>{env.name}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="loading-container">
//             <div className="loading-spinner"></div>
//             <p>Loading available GPUs...</p>
//           </div>
//         ) : (
//           <div className="gpu-clusters-list">
//             {gpuClusters.map((cluster) => (
//               <div 
//                 key={cluster.id} 
//                 className={`gpu-cluster-card ${cluster.status !== 'available' ? 'unavailable' : ''}`}
//               >
//                 <div className="cluster-identifier">
//                   <div className="gpu-icon">
//                     <div className="gpu-logo">indieGPU</div>
//                   </div>
//                   <div className="cluster-main-info">
//                     <h3 className="cluster-title">{cluster.gpuCount}x {cluster.gpuType}</h3>
//                     <div className="tflops-info">{cluster.tflops} <span className="unit">TFLOPS</span></div>
//                     <div className="cuda-info">Max CUDA: {cluster.maxCuda}</div>
//                   </div>
//                 </div>

//                 <div className="cluster-specs">
//                   <div className="spec-column">
//                     <div className="spec-item">
//                       <div className="spec-label">Total VRAM</div>
//                       <div className="spec-value">{cluster.totalVram}</div>
//                     </div>
//                     <div className="spec-item">
//                       <div className="spec-label">GB/s</div>
//                       <div className="spec-value">{cluster.gbps}</div>
//                     </div>
//                   </div>
                  
//                   <div className="spec-column">
//                     <div className="spec-item">
//                       <div className="spec-label">Motherboard</div>
//                       <div className="spec-value">{cluster.motherboard}</div>
//                     </div>
//                     <div className="spec-item">
//                       <div className="spec-label">Location</div>
//                       <div className="spec-value">{cluster.location}</div>
//                     </div>
//                   </div>
                  
//                   <div className="spec-column">
//                     <div className="spec-item">
//                       <div className="spec-label">↑ Upload</div>
//                       <div className="spec-value">{cluster.uploadSpeed}</div>
//                     </div>
//                     <div className="spec-item">
//                       <div className="spec-label">↓ Download</div>
//                       <div className="spec-value">{cluster.downloadSpeed}</div>
//                     </div>
//                   </div>
                  
//                   <div className="spec-column">
//                     <div className="spec-item">
//                       <div className="spec-label">Ports</div>
//                       <div className="spec-value">{cluster.ports}</div>
//                     </div>
//                     <div className="spec-item">
//                       <div className="spec-label">Reliability</div>
//                       <div className="spec-value">{cluster.reliability}</div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="cluster-pricing">
//                   <div className="price-tag">${cluster.price.toFixed(3)}/hr</div>
//                   <button 
//                     className="rent-button"
//                     disabled={cluster.status !== 'available'}
//                     onClick={() => handleRent(cluster.id)}
//                   >
//                     {cluster.status === 'available' ? 'RENT' : 'UNAVAILABLE'}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }