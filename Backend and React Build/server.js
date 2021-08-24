const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

const port = 6969

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//SERVING STATICS
app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

//CONNECT TO MONGOOSE
mongoose.connect('mongodb://localhost:27017/ProjectDB', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error'))
db.once('open', () => {
    console.log('Connected to DB');
})

//MODEL
const noteSchema = {
    title: String,
    content: String,
    time: String,
}
const Note = mongoose.model('note', noteSchema)

//ROUTES
//post method for adding notes
app.post('/insert-item', async (req, res) => {
    const { title, content, time } = req.body
    const newNote = new Note({
        title,
        content,
        time,
    })
    try {
        await newNote.save()
    } catch (error) {
        console.log(error);
    }
})

//reads all items
app.get('/all-items', (req, res) => {
    Note.find({}, (err, result) => {
        if (err)
            res.send(err)
        res.send(result)
    })
})

//deletes an item
app.delete('/delete-item/:id', async (req, res) => {
    const id = req.params.id
    await Note.findByIdAndDelete(id)
})

//update an item
app.put('/update-item/:id', async (req, res) => {
    const id = req.params.id
    const { title, content, time } = req.body
    try {
        await Note.findById(id, (err, item) => {
            item.time = time
            item.title = title
            item.content = content
            item.save()
            res.send('Updated')
        })
    } catch (error) {
        console.log(error)
    }
})

//LISTENING AT PORT
app.listen(port, () => {
    console.log(`Connected at http://localhost:${port}/`);
})
