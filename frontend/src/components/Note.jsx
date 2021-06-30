import React from "react";
import { Button, H4, Card, Elevation, Icon, Tag } from "@blueprintjs/core";

export default function Note({ note, deleteNote }) {
  return (
    <Card className="note-card" key={note.id} elevation={Elevation.TWO}>
      <div className="note-header">
        <H4>{note.title}</H4>
        <Button
          intent="danger"
          icon={<Icon icon="trash" />}
          onClick={() => deleteNote(note.id)}
        />
      </div>
      <p>{note.content}</p>
      <div className="tag-container">
        {note.tags.map((tag) => (
          <Tag key={tag} interactive={true}>
            {tag}
          </Tag>
        ))}
      </div>
    </Card>
  );
}
