import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'

import Profile from './pages/Profile'
import Home from './pages/Home'
import Document from './pages/Document'
import Dashboard from './pages/Dashboard'
import Chat from './pages/chat'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/document' element={<Document />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <Sidebar />
    </>
  )
}

export default App
