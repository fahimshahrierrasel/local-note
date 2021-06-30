import React, { useState, useEffect } from "react";
import {
  Navbar,
  Drawer,
  Button,
  Icon,
  DrawerSize
} from "@blueprintjs/core";
import NoteForm from "./components/NoteForm";
import "./App.css";
import { createNote, fetchNotes, deleteNote } from "./api";
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const submitForm = (data) => {
    createNote(data).then((_) => {
      setIsDrawerOpen(!isDrawerOpen);
      getNotes();
    });
  };

  const cancelForm = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const deleteThisNote = (noteId) => {
    deleteNote(noteId).then((_) => {
      getNotes();
    });
  };

  const getNotes = () => {
    fetchNotes().then((data) => {
      setNotes(data);
    });
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="app-container">
      <Navbar>
        <Navbar.Group>
          <Navbar.Heading><h2>Local Note</h2></Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align="right">
          <Button
            icon={<Icon icon="add-to-artifact" />}
            intent="primary"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            New Note
          </Button>
        </Navbar.Group>
      </Navbar>
      <div className="notes-container">
        {notes.map((note) => (
          <Note key={note.id} note={note} deleteNote={deleteThisNote} />
        ))}
      </div>
      <Drawer
        isOpen={isDrawerOpen}
        size={DrawerSize.SMALL}
        title="New Note"
        usePortal={true}
        lazy={true}
        autoFocus={true}
        hasBackdrop={true}
        canOutsideClickClose={false}
        onClose={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <NoteForm submitForm={submitForm} cancelForm={cancelForm} />
      </Drawer>
    </div>
  );
}

export default App;
