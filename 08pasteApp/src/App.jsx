import Home from './components/Home'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Paste from './components/Paste.jsx'
import ViewPaste from './components/ViewPaste.jsx'
import { Toaster } from 'react-hot-toast';

// const router= createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<div>
//         <Navbar/>
//         <Home/>
//       </div>
//     }>
//       <Route index element={<div>
//           <Navbar/>
//           <Home/>
//         </div>}/>

//       <Route path="/paste" element={<div>
//           <Navbar/>
//           <Paste/>
//         </div>}/>
     
//       <Route path="/paste:id" element={<div>
//           <Navbar/>
//           <ViewPaste/>
//         </div>}/>
//     </Route>
//   )
// )

const router= createBrowserRouter([
  {path:'/', element: 
    <div>
      <Navbar/>
      <br/>
      <Home/>
    </div>},
  {path:'/paste', element:
    <div>
      <Navbar/>
      <br/>
      <Paste/>
    </div>},
  {path:'/paste/:id', element:
    <div>
      <Navbar/>
      <br/>
      <ViewPaste/>
    </div>}
])

function App() {

  return (
    <div> 
      {/* Shubhanshu pal */}
      <RouterProvider router={router}/>
      <Toaster />
    </div>
  )
}

export default App
