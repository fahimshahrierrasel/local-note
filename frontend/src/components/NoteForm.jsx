import React, { useState } from "react";
import {
  Button,
  FormGroup,
  InputGroup,
  TextArea,
  TagInput,
} from "@blueprintjs/core";

export default function NoteForm({ submitForm, cancelForm }) {
  const [note, setNote] = useState({ title: "", content: "", tags: [] });
  const onFormSubmit = () => {
    submitForm(note);
  };

  const changeValue = (key, value) => {
    let updatedNote = { ...note };
    updatedNote[key] = value;
    setNote(updatedNote);
  };
  return (
    <form className="item-form">
      <div className="form-body">
        <FormGroup
          label="Title"
          labelFor="title"
          labelInfo="(required)"
          intent="primary"
        >
          <InputGroup
            id="title"
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={(e) => changeValue("title", e.target.value)}
          />
        </FormGroup>
        <FormGroup
          label="Content"
          labelFor="content"
          labelInfo="(required)"
          intent="primary"
        >
          <TextArea
            style={{ width: "100%" }}
            id="content"
            name="content"
            large={true}
            placeholder="Content"
            rows="6"
            value={note.content}
            onChange={(e) => changeValue("content", e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Tags" labelFor="tags" intent="primary">
          <TagInput
            id="tags"
            placeholder="Tags"
            values={note.tags}
            onChange={(values) => changeValue("tags", values)}
          />
        </FormGroup>
      </div>
      <div className="form-footer">
        <Button intent="warning" large={true} onClick={cancelForm}>
          Cancel
        </Button>
        <Button intent="primary" large={true} onClick={onFormSubmit}>
          Save
        </Button>
      </div>
    </form>
  );
}
