import { ProgressSpinner } from 'primereact/progressspinner'
import React from 'react'

const LoadingComponent = () => {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <ProgressSpinner />
    </div>
  )
}

export default LoadingComponent