import {lazy} from 'react'
const Navbar = lazy(() => import("../components/Navbar"));

const Home = () => {
  return (
    <div>
      <Navbar/>
      <h1>Home Page</h1>
    </div>
  )
}

export default Home