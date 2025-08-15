import React from 'react'
import "./badge.css"

const colors = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"]
const shapes = ["square", "rounded"]

export default function Badge({ label = "Badge", color = "primary", shape = "square", className = "" }) {
  if (!colors.includes(color)) {
    color = "primary"
  }

  if (!shapes.includes(shape)) {
    shape = "square"
  }

  return (
    <span className={`badge badge-${color} badge-${shape} ${className}`}>
      {label}
    </span>
  )
}
