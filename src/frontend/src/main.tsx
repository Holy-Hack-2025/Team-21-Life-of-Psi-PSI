import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Layout from './layout.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './dashboard/page.tsx'
import Document from './document/page.tsx'
import Chat from './components/ui/chat.tsx'
import VirtualTwin from './components/ui/virtual_twin/virtual_twin.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<></>}></Route>
      <Route path="/dashboard" element={<Dashboard />}> </Route>
        <Route path='/document' element={<Document />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/virtual_twin' element={<VirtualTwin />} />
    </Routes>
  </BrowserRouter>
    <Layout>
      <App />
    </Layout>
  </StrictMode>
);
