import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div style={styles.overlay}>
<ClipLoader color='#007bff' size={50}/>
      
    </div>
  )
}

const styles={
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(240, 248, 255, 0.8)", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      },
}

export default Loader
