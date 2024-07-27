// src/components/Sidebar.js
import React from 'react';
import "../styles.css";

const Sidebar = ({ onCreateNote,isCollapsed  }) => {
  return (
    <nav id="sidebar" className={isCollapsed ? 'collapsed' : ''} >
      <button id="createNoteBtn" onClick={onCreateNote}><i className="fa-regular fa-plus"></i> <span>Create Note</span></button>
      <button id="notesBtn"><i className="fa-regular fa-note-sticky"></i> <span>Notes</span></button>
    </nav>
  );
};

export default Sidebar;
