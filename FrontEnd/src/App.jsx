import { Suspense } from 'react'
import './App.css'
import Header from './Components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer';
function App() {
  return (
    <>
    <Header/>
    <Suspense>
      <Outlet/>
    </Suspense>
    <Footer/>
    </>
  )
}

export default App
