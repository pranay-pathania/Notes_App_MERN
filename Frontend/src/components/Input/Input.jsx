import React, { useState } from 'react'
import axios from 'axios'
import './Input.css'

const postURL = 'http://localhost:6969/insert-item/'

const initialInputState = {
    title: '',
    content: '',
}

const Input = () => {
    const [input, setInput] = useState(initialInputState)

    //for controlled inputs
    const handleChange = event => {
        const { name, value } = event.target
        setInput(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    //makes a post request
    const handleSubmit = event => {
        event.preventDefault()
        const { title, content } = input
        const newNote = {
            title,
            content,
            time: new Date().toString()
        }
        axios.post(postURL, newNote)
        alert('Item Added')
        setInput(initialInputState)
    }

    return <div className='form-container'>
        <h2>Create Note!</h2>
        <form className='form-control'>
            <input type="text" placeholder="Title" name="title" value={input.title} onChange={handleChange} />
            <textarea rows="10" placeholder="Content" name="content" value={input.content} onChange={handleChange} />
            <button type="submit" onClick={handleSubmit}>Add Note</button>
        </form>
    </div>
}

export default Input
