import React from 'react';

function ArchiveButton({ archived, archiveNote }) {
  return (
    <button
      className="text-yellow-400 button-base hover:text-amber-600"
      onClick={archiveNote}
    >
      {archived === false ? 'Arsipkan' : 'Pindahkan'}
    </button>
  );
}

export default ArchiveButton;
