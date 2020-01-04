const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const port = process.env.port || 6000;

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/keeperDB');

const noteSchema = new mongoose.Schema({
    title: String, 
    content: String
});

const Note = new mongoose.model('Note', noteSchema);

//Request Routes for all Notes
app.route("/notes")
.get((req, res) => {
    Note.find((err, foundNotes) => {
        if(err) {
            res.send(err);
        }
        else {
            res.send(foundNotes);
        }
    });
})
.post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const note = new Note({
        title: title,
        content: content
    });
    note.save((err) => {
        if(err) {
            res.send(err);
        }
        else {
            res.send("Successfully added new note");
        }
    });
});

//Request Routes for specific Note
app.route("/notes/:noteId")
.get((req, res) => {
    const noteId = req.params.noteId;
    Note.findOne({title: noteId}, (err, foundNote) => {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(foundArticle);
        }
    });
})
.delete((req, res) => {
    const noteId = req.params.noteId;
    console.log("DeleteNote: " + noteId);
    Note.findByIdAndDelete(noteId, (err) => { 
        if(err) {
            res.send(err);
        }
        else {
            res.send("Successfully deleted article.");
        } 
    });
});


app.listen(port, () => {
    console.log("Server listening on port: " + port);
});

app.get('/express_backend', (req, res) => {
    res.send({express: 'Express Backend Connected'});
});