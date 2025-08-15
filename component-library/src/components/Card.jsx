import React from 'react'
import "./card.css"

export default function Card({ title = "Card", subtitle = "Card Subtitle", className = "" }) {
  return (
    <div className={`card ${className}`}>
      <img src={`./public/upload.svg`} alt="upload" />

      <div className="info">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  )
}
