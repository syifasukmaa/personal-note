import React from 'react';

function DeleteButton({ deleteNote }) {
  return (
    <button
      className="text-orange-500 button-base hover:text-red-600"
      onClick={deleteNote}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
