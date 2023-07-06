import React from 'react';

function DeleteButton({ deleteNote }) {
  return (
    <button className="w-full py-1 text-orange-500 border-t-[1px] border-r-[1px] border-primary font-bold hover:text-red-600" onClick={deleteNote}>
      Delete
    </button>
  );
}

export default DeleteButton;
