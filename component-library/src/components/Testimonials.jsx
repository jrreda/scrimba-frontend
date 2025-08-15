import React from 'react'
import "./testimonials.css"

export default function Testimonials({ text = "Testimonials", name = "", job = "", className = "" }) {
  return (
    <div className={`testimonials ${className}`}>
      <img src={`./public/testimonials.jpg`} alt="testimonial image" />

      <div className="info">
        <img src={`./public/quotes.svg`} alt="quotes" />

        <p className="text">{text}</p>

        <div className="name-job">
          {name && <p className="name">{name}</p>}
          {job && <p className="job">{job}</p>}
        </div>
      </div>
    </div>
  )
}
