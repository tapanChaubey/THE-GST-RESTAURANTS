import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Home from "./pages/Home.jsx";

import Show from './pages/Show.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx'
import AddCard from './pages/AddCard.jsx';
import Order from './pages/Order.jsx';
import Payment from './pages/Payment.jsx';
import PaymentStatus from './pages/PaymentStatus.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route path='' element={<Home/>}/>
        <Route path="/food/:id" element={<Show/>}/>
        <Route path="/about" element={<Show/>}/>
        <Route path="/cardfood/:id" element={<Show/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/addcard' element={<AddCard/>}/>
        <Route path='/addcard/:id' element={<AddCard/>}/>
        <Route path='/addOrder/:id' element={<Order/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/status' element={<PaymentStatus/>}/>
    </Route>
))

createRoot(document.getElementById('root')).render( 
  <RouterProvider router={router}>
  </RouterProvider>
)
