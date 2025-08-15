import { useState } from 'react'
import Questions from './Questions.jsx'

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
        <Questions />
      )}
    </>
  )
}

export default App
