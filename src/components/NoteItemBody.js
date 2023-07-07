import React from 'react';
import { showFormattedDate } from '../utils';

function NoteItemBody({ title, createdAt, body }) {
  return (
    <>
      <h3 className="text-xl font-bold text-sky-600">{title}</h3>
      <p className="text-sm text-secondary dark:text-slate-500">{showFormattedDate(createdAt)}</p>
      <p className="pt-1 text-base font-medium leading-tight text-left dark:text-secondary">
        {body}
      </p>
    </>
  );
}

export default NoteItemBody;
