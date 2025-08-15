import React from 'react'
import "./banner.css"

const colors = ["neutral", "success", "warning", "error"]

export default function Banner({ title = "Banner", subtitle = "", color = "neutral", className = "" }) {
  if (!colors.includes(color)) {
    color = "neutral"
  }

  const icon = color === "success" ? "success" : color === "warning" ? "warning" : color === "error" ? "error" : "info"

  return (
    <div className={`banner banner-${color} ${className}`}>
      <img src={`./public/${icon}.svg`} alt={icon} />

      <div className="info">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  )
}
