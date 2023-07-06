import React from 'react';
import { showFormattedDate } from '../utils';

function NoteItemBody({ title, createdAt, body }) {
  return (
    <>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-secondary">{showFormattedDate(createdAt)}</p>
      <p className="pt-1 text-base font-medium leading-tight">{body}</p>
    </>
  );
}

export default NoteItemBody;
