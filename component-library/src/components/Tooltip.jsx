import { useId, useState, useEffect } from 'react'
import "./tooltip.css"

export default function Tooltip({ children, title = "Tooltip", content = "Tooltip", position = "top", color = "primary", className = "", delay = 200 }) {
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)
  const tooltipId = useId() // Generates unique ID for aria-describedby

  // Cleanup timer when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  const showTooltip = () => {
    const id = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    setTimeoutId(id)
  }

  const hideTooltip = () => {
    clearTimeout(timeoutId)
    setIsVisible(false)
  }

  const handleTouch = () => {
    if (isVisible) {
      hideTooltip()
    } else {
      showTooltip()
    }
  }

  return (
    <div className="tooltip-wrapper"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      onTouchStart={handleTouch}
      aria-describedby={isVisible ? tooltipId : undefined}
      tabIndex={0}
    >
      <>{children}</>

      {isVisible && (
        <div className={`tooltip ${position} ${className} ${color}`}
          role="tooltip"
          id={tooltipId}
        >
          <img src="/tooltip-Icon.svg" alt="tooltip icon" />
          <div>
            <h3>{title}</h3>
            <p>{content}</p>
          </div>
        </div>
      )}
    </div>
  )
}