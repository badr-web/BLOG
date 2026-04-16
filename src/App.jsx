import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import BlogList from './pages/BlogList'
import CreateBlog from './pages/CreateBlog'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<CreateBlog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
