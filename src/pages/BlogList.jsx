import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchBlogs()
  }, [])

  async function fetchBlogs() {
    setLoading(true)
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      alert('Error fetching blogs:', error.message)
    } else {
      setBlogs(data)
    }
    setLoading(false)
  }

  async function deleteBlog(id) {
    const { error } = await supabase.from('blogs').delete().eq('id', id)
    if (error) {
      alert('Error deleting blog:', error.message)
    } else {
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }
  }

  if (loading) {
    return <div className="loading">Loading blogs...</div>
  }

  return (
    <div className="container">
      {blogs.length === 0 ? (
        <div className="empty-state">
          <p>No blogs yet. Click <strong>Create New</strong> to add your first post!</p>
        </div>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <h2 className="blog-card-title">{blog.title}</h2>
              <p className="blog-card-desc">{blog.description}</p>
              <p className="blog-card-date">
                📅 {new Date(blog.created_at).toLocaleDateString('fr-FR', {
                  day: '2-digit', month: 'long', year: 'numeric'
                })}
              </p>
              <div className="blog-card-actions">
                <button
                  className="btn btn-delete"
                  onClick={() => deleteBlog(blog.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-edit"
                  onClick={() => navigate(`/edit/${blog.id}`)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogList
