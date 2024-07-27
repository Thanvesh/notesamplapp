import React from 'react';
import "../styles.css";

const Note = ({ note, onEdit, onDelete }) => {
  // Function to determine if the background color is dark
  const isColorDark = (color) => {
    const hex = color.replace(/^#/, '');
    const rgb = parseInt(hex, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note._id);
    }
  };

  const handleEditClick = () => {
    onEdit(note); // Trigger the onEdit function with the current note
  };


  const isDark = isColorDark(note.backgroundColor);

  return (
    <div
      className={`note ${isDark ? 'dark-note' : ''}`}
      style={{ backgroundColor: note.backgroundColor, color: isDark ? 'white' : 'black' }}
    >
      <h3 className="note-title"><span>Title</span>{note.title}</h3>
      <p><span>Description</span>{note.content}</p>
      <div className="noteButtonContainer">
        <button onClick={handleDelete} className="note-button">
          <i className="fa-solid fa-trash"></i>
        </button>
        <button  onClick={handleEditClick} className="note-button">
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
      </div>
    </div>
  );
};

export default Note;
