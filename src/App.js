import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Note from './components/Note';
import CreateArea from './components/CreateArea';


function App() {
  const [notes, setNotes] = useState([]);

  function addNote(note){
    setNotes(prevNotes => {
      return [...prevNotes, note];
    });
  }

  function deleteNote(noteId) {
    setNotes(prevNotes =>{
      return prevNotes.filter((note, index)=>{
        return index !== noteId;
      });
    });
  }

  return (
    <div>
      <Header/>
      <CreateArea onAdd={addNote}/>
      {notes.map((noteItem, index) => 
        <Note
          key={index}
          id={index}
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
