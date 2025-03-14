import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Layout from './layout.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './dashboard/page.tsx'
import Document from './document/page.tsx'
import { ChatPage } from './chat/page.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<></>}></Route>
      <Route path="/dashboard" element={<Dashboard />}> </Route>
        <Route path='/document' element={<Document />} />
        <Route path='/chat' element={<ChatPage />} />
    
    </Routes>
  </BrowserRouter>
);

    <Layout>
    <App />
    </Layout>
  </StrictMode>,
)
