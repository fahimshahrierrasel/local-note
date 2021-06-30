const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const createNote = async (note) => {
  const url = `${BASE_URL}/notes`;
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(note),
  });
  return response.json();
};

export const fetchNotes = async () => {
  const url = `${BASE_URL}/notes`;
  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  return response.json();
};

export const deleteNote = async (noteId) => {
  const url = `${BASE_URL}/notes/${noteId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: headers,
  });
  return response.json();
};
