import axios from 'axios'
import React, { useState } from 'react'
import './Note.css'

const Note = ({ _id, title, content, time, bgcolor }) => {
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [updatedInput, setUpdatedInput] = useState({
        title,
        content,
        time,
    })

    const handleChange = event => {
        const { name, value } = event.target
        setUpdatedInput(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const deleteNote = itemId => {
        axios.delete(`http://localhost:6969/delete-item/${itemId}`)
        alert("Deleted Item")
    }

    const updateValues = itemId => {
        const { title, content } = updatedInput
        const updatedNote = {
            title,
            content,
            time: new Date().toString()
        }
        axios.put(`http://localhost:6969/update-item/${itemId}`, updatedNote)
        alert('Updated item')
        setIsUpdateOpen(false)
    }

    return <section className="note" style={{background:bgcolor}}>
        <h3><strong>Title:</strong> {title}</h3>
        <p id="note-content"><strong>Note:</strong> {content}</p>
        <p><strong>Added on:</strong> {time}</p>
        <div className="buttons">
            <button onClick={() => deleteNote(_id)}>Delete Note</button>
            <button onClick={() => setIsUpdateOpen(!isUpdateOpen)}>{isUpdateOpen ? 'Cancel Update' : 'Update Note'}</button>
        </div>
        {isUpdateOpen && <div className="update-container">
            <input type="text" placeholder="New Title" name="title" value={updatedInput.title} onChange={handleChange} />
            <textarea rows="6" placeholder="New Content" name="content" value={updatedInput.content} onChange={handleChange} />
            <button className="new-values-btn" onClick={() => updateValues(_id)}>Save Changes</button>
        </div>}
    </section>
}

export default Note
