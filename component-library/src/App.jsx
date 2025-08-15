import './App.css'
import Badge from './components/Badge'
import Banner from './components/Banner'
import Card from './components/Card'

function App() {
  return (
    <>
      <h1>Component Library</h1>

      <div className="section">
        <h2>Badges</h2>
        <div className="list">
          <Badge label="Badge" color="primary" shape="square" />
          <Badge label="Badge" color="secondary" shape="square" />
          <Badge label="Badge" color="success" shape="square" />
          <Badge label="Badge" color="danger" shape="square" />
          <Badge label="Badge" color="warning" shape="square" />
          <Badge label="Badge" color="info" shape="square" />
          <Badge label="Badge" color="light" shape="square" />
          <Badge label="Badge" color="dark" shape="square" />
        </div>

        <div className="list">
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

      <div className="section">
        <h2>Banners</h2>
        <div className="list list-col">
          <Banner title="Congratulations!" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam." color="success" />
          <Banner title="Attention" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam." color="warning" />
          <Banner title="There is a problem with your application" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam." color="error" />
          <Banner title="Update available" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam." />
        </div>
        <div className="list list-col">
          <Banner title="Congratulations!" color="success" />
          <Banner title="Attention" color="warning" />
          <Banner title="There is a problem with your application" color="error" />
          <Banner title="Update available" />
        </div>
      </div>

      <div className="section">
        <h2>Card</h2>
        <Card title="Easy Deployment" subtitle="Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis." />
      </div>
    </>
  )
}

export default App
