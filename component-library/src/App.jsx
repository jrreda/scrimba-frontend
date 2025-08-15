import './App.css'
import Badge from './components/Badge'

function App() {
  return (
    <>
      <h1>Component Library</h1>

      <div className="section">
        <h2>Badges</h2>
        <div className="flex gap-2">
          <Badge label="Badge" color="primary" shape="square" />
          <Badge label="Badge" color="secondary" shape="square" />
          <Badge label="Badge" color="success" shape="square" />
          <Badge label="Badge" color="danger" shape="square" />
          <Badge label="Badge" color="warning" shape="square" />
          <Badge label="Badge" color="info" shape="square" />
          <Badge label="Badge" color="light" shape="square" />
          <Badge label="Badge" color="dark" shape="square" />
        </div>

        <div className="flex gap-2 my-2">
          <Badge label="Badge" color="primary" shape="rounded" />
          <Badge label="Badge" color="secondary" shape="rounded" />
          <Badge label="Badge" color="success" shape="rounded" />
          <Badge label="Badge" color="danger" shape="rounded" />
          <Badge label="Badge" color="warning" shape="rounded" />
          <Badge label="Badge" color="info" shape="rounded" />
          <Badge label="Badge" color="light" shape="rounded" />
          <Badge label="Badge" color="dark" shape="rounded" />
        </div>
      </div>
    </>
  )
}

export default App
