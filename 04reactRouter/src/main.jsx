import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import Users from './components/Users/Users.jsx'
import GithubProfile, {githubInfoLoader} from './components/Github/GithubProfile.jsx'

// const router = createBrowserRouter([
//   {path:'/', element:<Layout/>, children:[{
//       path:'',
//       element:<Home/>
//     },
//     {
//       path:'about',
//       element:<About/>
//     },
//     {
//       path:'contact',
//       element:<Contact/>
//     }
//    ]
//   }
// ])

//or
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='users/:userid' element={<Users/>}/>
      <Route 
      loader={githubInfoLoader}
      path='github' 
      element={<GithubProfile/>}/>
      {/* <Loader></Loader> */}
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>

  </StrictMode>,
)
