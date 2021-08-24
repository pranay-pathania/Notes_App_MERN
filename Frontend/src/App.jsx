import React, { useState, useEffect } from 'react'
import Input from './components/Input/Input'
import Note from './components/Note/Note'
import Introduction from './components/Introduction/Introduction'
import Steps from './components/Steps(PC Only)/Steps'
import './App.css'
import { colors } from './noteColors'

const fetchURL = 'http://localhost:6969/all-items/'

const initialListObject = {
  title: '',
  content: '',
  time: '',
  _id: '',
}

const App = () => {
  const [notesList, setNotesList] = useState([
    initialListObject
  ])

  //fetching data from the database
  const fetchData = async () => {
    const response = await fetch(fetchURL)
    const data = await response.json()
    setNotesList(data)
  }

  const refreshData = () => {
    fetchData()
  }

  //load all data initially
  useEffect(() => {
    fetchData()
  }, [])

  return <>
    <section className="input-title">
      <Introduction />
      <Input />
      <Steps />
    </section>
    <div className="notes">
      <section className="heading">
        <h1>Your Notes</h1>
        <button className="refresh" onClick={refreshData}>Refresh Notes</button>
      </section>
      <section className="notes-container">
        {notesList.map((item, index) => {
          return <div key={item._id}>
            <Note {...item} bgcolor={colors[index%colors.length]}/>
          </div>
        })}
      </section>
    </div>
  </>
}

export default App