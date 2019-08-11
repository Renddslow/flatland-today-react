import React, { useState } from "react";
import { get, set } from "dot-prop";
import styled from "styled-components";
import moment from "moment";
import uuid from "uuid/v4";

import Card from "../../components/Card";
import Button from "../../components/Button";
import Textarea from "../../components/Textarea";

const getNotes = (week, index) => {
  const noteTree = JSON.parse(
    window.localStorage.getItem("flatland:messageNotes") || "{}"
  );
  return [get(noteTree, `${week}.${index}`, []), noteTree];
};

const Note = styled(Card)`
  padding: 24px;
  box-sizing: border-box;
  margin: 12px 0;
`;

const NoteMeta = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
`;

const NoteFooter = styled.div`
  width: 100%;
  display: grid;
  margin-bottom: 4rem;
  grid-template-columns: ${props =>
    `repeat(${React.Children.count(props.children)}, minmax(0, max-content))`};
  justify-content: end;
  grid-column-gap: 16px;
`;

const MessageNotes = props => {
  const [notes, setNotes] = useState(getNotes(props.week, props.index)[0]);
  const [editing, setEditing] = useState(false);
  const [tempNote, setTempNote] = useState("");

  const handleSave = () => {
    const [currentNotes, noteTree] = getNotes(props.week, props.index);
    const newNotes = [
      ...currentNotes,
      {
        timestamp: Number(new Date()),
        id: uuid(),
        content: tempNote
      }
    ];
    const newTree = set(noteTree, `${props.week}.${props.index}`, newNotes);
    setNotes(newNotes);
    setEditing(false);
    setTempNote("");
    window.localStorage.setItem(
      "flatland:messageNotes",
      JSON.stringify(newTree)
    );
  };

  return (
    <>
      {notes.map(note => (
        <Note key={note.id}>
          <p>{note.content}</p>
          <NoteMeta>{moment(note.timestamp).format("M/D HH:mm")}</NoteMeta>
        </Note>
      ))}
      {editing && (
        <Textarea
          value={tempNote}
          onChange={e => setTempNote(e.target.value)}
        />
      )}
      {editing ? (
        <NoteFooter>
          <Button context="subtle" onClick={() => setEditing(false)}>
            Cancel
          </Button>
          <Button context="primary" onClick={handleSave}>
            Save
          </Button>
        </NoteFooter>
      ) : (
        <NoteFooter>
          <Button context="subtle" onClick={() => setEditing(true)}>
            + Add Note
          </Button>
        </NoteFooter>
      )}
    </>
  );
};

export default MessageNotes;
