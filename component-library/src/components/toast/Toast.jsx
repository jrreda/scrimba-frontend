import { useEffect, useState, useRef } from 'react'
import "./toast.css"

// Default toast type
const toastType = {
  "success": {
    'icon': '/success.svg',
    'title': 'Success',
    'content': 'Your work has been saved'
  },
  "error": {
    'icon': '/error.svg',
    'title': 'Error',
    'content': 'Please re-save your work again'
  },
  "warning": {
    'icon': '/warning.svg',
    'title': 'Warning',
    'content': 'A network error was detected'
  },
  "info": {
    'icon': '/info.svg',
    'title': 'Info',
    'content': 'Please read updated information'
  }
}

export default function Toast({ type = 'info', title, content, timer = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true)
  const timeoutIdRef = useRef(null)

  useEffect(() => {
    timeoutIdRef.current = setTimeout(() => {
      setIsVisible(false)
    }, timer)

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
    }
  }, [timer])

  const handleAnimationEnd = (e) => {
    // Only call onClose when the slide-out animation completes
    if (e.animationName === 'slideOut' && !isVisible) {
      onClose()
    }
  }

  const handleMouseEnter = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }
  }

  const handleMouseLeave = () => {
    timeoutIdRef.current = setTimeout(() => {
      setIsVisible(false)
    }, timer)
  }

  const handleClose = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }
    setIsVisible(false)
  }

  return (
    <div className={`toast ${type} ${!isVisible ? 'hidden' : ''}`}
      onAnimationEnd={handleAnimationEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={toastType[type].icon} alt={type} />

      <div className="toast-content">
        <h3 className='title'>{title || toastType[type].title}</h3>
        <p className='content'>{content || toastType[type].content}</p>
      </div>

      <button onClick={handleClose} className="close" aria-label="Close toast" type='button'>x</button>

      <div className="toast-progress" style={{ animationDuration: `${timer}ms` }}></div>
    </div>
  )
}
