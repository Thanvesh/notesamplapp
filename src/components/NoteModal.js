// src/components/NoteModal.js
import React, { useEffect, useState } from 'react';
import "../styles.css";

const NoteModal = ({ showModal, onClose, onSave, note }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setColor(note.backgroundColor);
    } else {
      setTitle('');
      setContent('');
      setColor('#ffffff');
    }
  }, [note]);

  const handleSave = () => {
    onSave({ title, content, backgroundColor: color });
  };

  if (!showModal) return null;

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="m-c">
          <h1>{note ? 'Edit Note' : 'Create Note'}</h1>
          <div className="model-content-details">
            <div className="inside-model-left">
              <input className="edit" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
              <textarea className="edit" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"></textarea>
            </div>
            <div className="inside-model-center-right">
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
          </div>
          <button id="saveNoteBtn" onClick={handleSave}><i className="fa-solid fa-save"></i> Save Note</button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
