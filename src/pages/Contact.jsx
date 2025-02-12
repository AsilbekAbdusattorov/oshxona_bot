import React from 'react'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className='space-y-6'>
        <h1 className='text-2xl font-bold text-yellow-400'>Habar yuborish</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae, facere ea sint quae accusamus qui repudiandae voluptatem impedit ducimus aspernatur minus libero tempore maxime quaerat adipisci quas veritatis, fugiat sunt?</p>
        <button onClick={()=> navigate('/send-message')}>Yuborish</button>
      </div>
    </div>
  )
}

export default Contact