import {Link, Redirect, routes} from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth'

const HomePage = () => {
  const { currentUser, isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return (
      <p>{currentUser.email}</p>
    )
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.jsx</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
    </>
  )
}

export default HomePage
