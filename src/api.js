const API_URL ='https://noteserver-1tbd.onrender.com/api';

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/noteusers/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const signupUser = async (username, email, password) => {
  const response = await fetch(`${API_URL}/noteusers/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  return response.json();
};

export const fetchNotes = async (authToken) => {
  const response = await fetch(`${API_URL}/notes`, {
    headers: { 'Authorization': `Bearer ${authToken}` },
  });
  return response.json();
};

export const saveNote = async (authToken, note, editNoteId) => {
  const method = editNoteId ? 'PUT' : 'POST';
  const url = editNoteId ? `${API_URL}/notes/${editNoteId}` : `${API_URL}/notes`;
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify(note),
  });
  return response.json();
};
export const deleteNote = async (authToken, noteId) => {
    const response = await fetch(`${API_URL}/notes/${noteId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    
    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error deleting note');
      }
      return data;
    } else {
      const text = await response.text();
      if (!response.ok) {
        throw new Error(text || 'Error deleting note');
      }
      return text;
    }
  };
  

export const createNote = async (authToken, noteData) => {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(noteData)
    });
    if (!response.ok) {
      throw new Error('Failed to create note');
    }
    return response.json();
  };
  
  export const updateNote = async (authToken, noteId, noteData) => {
    const response = await fetch(`${API_URL}/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(noteData)
    });
    if (!response.ok) {
      throw new Error('Failed to update note');
    }
    return response.json();
  };