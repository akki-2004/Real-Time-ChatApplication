import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Chats from './Components/Pages/Chats'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1>Heelo From CLient</h1>
       */}
       <div className='App'>

       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chats' element={<Chats/>}/>
       </Routes>
       </div>
    </>
  )
}

export default App
