// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Auth/LogIn';
import Signup from './components/Auth/SignUp';
import NotesContainer from './components/NotesContainer';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import NoteModal from './components/NoteModal';
import { createNote, updateNote } from './api'; // Import API functions
import "./styles.css";

const Layout = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [notes, setNotes] = useState([]); // State to hold notes
  const [viewMode, setViewMode] = useState('list');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'list' ? 'grid' : 'list');
  };



  const handleCreateNote = () => {
    setCurrentNote(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveNote = async (noteData) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        if (currentNote) {
          await updateNote(authToken, currentNote._id, noteData);
          // Update the notes state directly
          setNotes(notes.map(note =>
            note._id === currentNote._id ? { ...note, ...noteData } : note
          ));
        } else {
          const newNote = await createNote(authToken, noteData);
          // Update the notes state directly
          setNotes([...notes, newNote]);
        }
        handleCloseModal();
      } catch (error) {
        console.error("Error saving note:", error);
      }
    }
  };
  const handleEditNote = (note) => {
    setCurrentNote(note);
    setShowModal(true);
  };


  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/signup' && (
        <>
          <Header setSearchTerm={setSearchTerm}
            toggleSidebar={toggleSidebar}
            viewMode={viewMode}
            toggleViewMode={toggleViewMode}/>
          <div className='main-cont'>
            <Sidebar onCreateNote={handleCreateNote} isCollapsed={isSidebarCollapsed} />
            <div id="mainContent" className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
              <Routes>
                <Route
                  path="/notes"
                  element={
                    <ProtectedRoute>
                      <NotesContainer searchTerm={searchTerm} viewMode={viewMode} onEdit={handleEditNote}  />
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/notes" />} />
              </Routes>
            </div>
          </div>
        </>
      )}
      {location.pathname === '/login' || location.pathname === '/signup' ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/notes" />} />
        </Routes>
      ) : null}
      {showModal && (
        <NoteModal
          showModal={showModal}
          onClose={handleCloseModal}
          onSave={handleSaveNote}
          note={currentNote}
        />
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
