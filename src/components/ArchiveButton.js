import React from 'react';

function ArchiveButton({ archived, archiveNote }) {
  return (
    <button
      className="w-full py-1 text-yellow-400 border-t-[1px] border-primary font-bold hover:text-amber-600"
      onClick={archiveNote}
    >
      {archived === false ? 'Arsipkan' : 'Pindahkan'}
    </button>
  );
}

export default ArchiveButton;
