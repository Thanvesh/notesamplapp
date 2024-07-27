// src/components/Header.js
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles.css";

const Header = ({setSearchTerm, toggleSidebar,viewMode, toggleViewMode  }) => {
  
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const navigate = useNavigate();


  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('authToken');
    
    // Redirect to login page
    navigate('/login');
  };

  const handleSearchChange = (event) => {
    setLocalSearchTerm(event.target.value);

  };

  const handleSearchClick = () => {
    setSearchTerm(localSearchTerm);
  };


  const handleClearSearch = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
  };


  return (
    <header>
      <div className="header-left">
        <button id="menuIcon" onClick={toggleSidebar}><i className="fa-solid fa-bars"></i></button>
        <div id="appName"><i className="fa-regular fa-note-sticky"></i> <span>RadaNotes</span></div>
      </div>
      <div className="header-center">
        <div className="search-container">
          <input
            type="text"
            id="searchBox"
            placeholder="Search notes"
            value={localSearchTerm}
            onChange={handleSearchChange}
          />
          <div className="btn-cont">
            <button id="clearSearchBtn" className="clear-button" title="Clear search" onClick={handleClearSearch}><i className="fa-solid fa-x"></i></button>
            <button id="searchBtn" onClick={handleSearchClick}><i className="fa-solid fa-search"></i></button>
          </div>
        </div>
      </div>
      <div className="header-right">
      {viewMode === 'list' ? (
          <button id="gridViewBtn" onClick={toggleViewMode}><i className="fa-solid fa-grip"></i></button>
        ) : (
          <button id="listViewBtn" onClick={toggleViewMode}><i className="fa-solid fa-list"></i></button>
        )}
        <button id="logoutBtn" onClick={handleLogout}><i className="fa-solid fa-sign-out-alt"></i></button>
      </div>
    </header>
  );
};

export default Header;
