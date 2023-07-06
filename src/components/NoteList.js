import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ listNote, deleteNote, archiveNote, updateNote}) {
  return (
    <>
      {listNote.map((item) => (
        <NoteItem key={item.id} note={item} deleteNote={deleteNote} archiveNote={archiveNote} updateNote={updateNote} />
      ))}
    </>
  );
}
export default NoteList;
