// src/components/NotesContainer.js
import React, { useEffect, useState } from 'react';
import Note from './Note';
import { fetchNotes, deleteNote } from '../api';
import "../styles.css";

const NotesContainer = ({ searchTerm, viewMode,onEdit  }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        try {
          const data = await fetchNotes(authToken);
          setNotes(data);
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (noteId) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        await deleteNote(authToken, noteId);
        setNotes(notes.filter(note => note._id !== noteId));
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  const filteredNotes = notes?.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="notesContainer"  className={viewMode}>
      {filteredNotes.length ? (
        filteredNotes.map(note => (
          <Note
            key={note._id}
            note={note}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
};

export default NotesContainer;
