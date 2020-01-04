import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Note from './components/Note';
import CreateArea from './components/CreateArea';
import Axios from 'axios';

const apiUrl = '/notes';
const apiConfig = {
  headers: {'Content-Type': 'application/json'}
};

function App() {
  const [notes, setNotes] = useState([]);
  async function addNote(note) {
    const response = await Axios.post(apiUrl, note, apiConfig);
    getNotes();
  }

  async function deleteNote(noteId) {
    const response = await Axios.delete(apiUrl + "/" + noteId, apiConfig);
    getNotes();
  }

  const getNotes = useCallback( async () => {
    const response = await Axios.get(apiUrl, apiConfig);
    if(response.status === 200) {
      if(response.data) {
        setNotes(response.data);
      }
    }
  }, [setNotes]);
  

  useEffect(() => {
    async function loadNotes() {
      await getNotes();
    }
    loadNotes();
    
  }, [getNotes]);

  return (
    <div>
      <Header/>
      <CreateArea onAdd={addNote}/>
      {notes.map((noteItem, index) => 
        <Note
          key={index}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />)
      }
      <Footer/>
    </div>
    
  );
}

export default App;
