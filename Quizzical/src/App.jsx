import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [firstRender, setFirstRender] = useState(0)

  return (
    <>
      {firstRender === 0 ? (
        <>
          <h1>Quizzical</h1>
          <h2>
            Some description if needed
          </h2>
          <button onClick={() => setFirstRender(1)}>
            Start quiz
          </button>
        </>
      ) : (
        <>
          <div>
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={viteLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <div className="card">
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </>
      )}
    </>
  )
}

export default App
