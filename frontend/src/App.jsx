import { Suspense } from 'react'
import './App.css'
import {WebWizClient} from "webwiz-client";
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { UserContextProvider } from './contexts/useUserContext';
function App() {
  
  return (
    <UserContextProvider>
      <>
      <Header/>
      <Suspense>
        <Outlet/>
      </Suspense>
      <Footer/>
      </>
    </UserContextProvider>
  )
}

export default App
