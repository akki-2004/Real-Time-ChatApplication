import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Chats from './Components/Chats'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1>Heelo From CLient</h1>
       */}
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chats' element={<Chats/>}/>
       </Routes>
    </>
  )
}

export default App
