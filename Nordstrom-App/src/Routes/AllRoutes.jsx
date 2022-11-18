import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from '../Pages/Cart'
import Home from '../Pages/Home'
import Mens from '../Pages/Mens'
import Register from '../Pages/Register'
import Womens from '../Pages/Womens'
import PrivateRoute from './PrivateRoute'

function AllRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/mens' element={<Mens />} />
      <Route path='/womens' element={<Womens />} />
      <Route path='/register' element={<Register />} />
      <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
    </Routes>
  )
}

export default AllRoutes
