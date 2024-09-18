import { ProgressSpinner } from 'primereact/progressspinner'
import React from 'react'

const LoadingComponent = () => {
  return (
    <div style={{ background: "#f5f9ff", opacity: "0.8", width: "100%", position: "fixed", top: "0", left: "0", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <ProgressSpinner />
    </div>
  )
}

export default LoadingComponent