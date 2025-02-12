import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='flex flex-col w-full min-h-screen'>
      <main className=''>
        <div className="">
          <Outlet/>
        </div>
      </main>
    </div>
  )
}

export default MainLayout