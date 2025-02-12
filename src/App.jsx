import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

// pages
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import PageNotFound from './pages/PageNotFound'
import MainLayout from './layouts/MainLayout'
import SenMessage from './pages/SenMessage'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout/>}>
          <Route index element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/send-message' element={<SenMessage/>}/>
          <Route path='*' element={<PageNotFound/>}/>
      </Route>
    )
  )


  return (
    <RouterProvider router={router} />
  )
}

export default App