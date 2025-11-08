import './App.css'
import Badge from './components/Badge'
import Banner from './components/Banner'
import Card from './components/Card'
import Testimonials from './components/Testimonials'
import Tooltip from './components/Tooltip'
import { useToast } from './components/toast/useToast'

function App() {
  const toast = useToast()

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

      <div className="section">
        <h2>Testimonials</h2>
        <Testimonials text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna nulla vitae laoreet augue. Amet feugiat est integer dolor auctor adipiscing nunc urna, sit." name="May Andersons" job="Workcation, CTO" />
      </div>

      <div className="section">
        <h2>Tooltip</h2>

        <div className="list list-col">
          <Tooltip
            title="Archive notes"
            content="lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam."
            position="top"
            delay="150"
            className=""
          >
            <button>Archive</button>
          </Tooltip>

          <Tooltip
            title="Info notes"
            content="lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam."
            position="bottom"
            delay="50"
            className=""
            color='info'
          >
            <p>Info</p>
          </Tooltip>

          <Tooltip
            title="Info notes"
            content="lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam."
            position="left"
            delay="100"
            className=""
            color='danger'
          >
            <span>Danger</span>
          </Tooltip>

          <Tooltip
            title="Info notes"
            content="lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam."
            position="right"
            delay="150"
            className=""
            color='success'
          >
            <div>Success</div>
          </Tooltip>
        </div>
      </div>

      <div className="section">
        <h2>Toast</h2>

        <div className="list">
          <button onClick={() => toast.success()}>Show Success Toast</button>
          <button onClick={() => toast.error('Error', 'Your work has not been saved', 8000)}>Show Error Toast</button>
          <button onClick={() => toast.warning('Warning', 'Your work has not been saved', 4000)}>Show Warning Toast</button>
          <button onClick={() => toast.info('Info', 'Your work has not been saved', 6000)}>Show Info Toast</button>
        </div>
      </div>
    </>
  )
}

export default App
