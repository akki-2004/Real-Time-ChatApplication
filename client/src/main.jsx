import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from "react-router-dom"
import App from './App.jsx'
import './index.css'
import ChatProvider from './Context/ChatProvider.js'

createRoot(document.getElementById('root')).render(
  <ChatProvider>


  <BrowserRouter>
  
  <StrictMode>
    <ChakraProvider>
    <App />
  </ChakraProvider>
  </StrictMode>,
  </BrowserRouter>
  </ChatProvider>
)
