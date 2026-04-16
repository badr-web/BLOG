import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function CreateBlog() {
  const { id } = useParams()   
  const isEditMode = Boolean(id)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  // Load existing blog data when editing
  useEffect(() => {
    if (isEditMode) {
      fetchBlog()
    }
  }, [id])

  async function fetchBlog() {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching blog:', error.message)
    } else {
      setTitle(data.title)
      setDescription(data.description)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)

    if (isEditMode) {
      const { error } = await supabase
        .from('blogs')
        .update({ title, description })
        .eq('id', id)

      if (error) {
        alert('Error updating blog:', error.message)
      } else {
        navigate('/')
      }
    } else {
      const { error } = await supabase
        .from('blogs')
        .insert([{ title, description }])

      if (error) {
        alert('Error creating blog:', error.message)
      } else {
        navigate('/')
      }
    }

    setLoading(false)
  }

  return (
    <div className="container">
      <div className="form-wrapper">
        <button className="btn btn-back" onClick={() => navigate('/')}>
          ← Retour
        </button>
        <h2 className="form-title">
          {isEditMode ? 'Edit Blog' : 'Create a new Blog'}
        </h2>
        <form onSubmit={handleSubmit} className="blog-form">
          <input
            type="text"
            className="form-input"
            placeholder="Write your title .."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="form-textarea"
            placeholder="Write your description .."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            required
          />
          <button type="submit" className="btn btn-save" disabled={loading}>
            {loading ? 'Saving...' : 'Save Blog'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog
