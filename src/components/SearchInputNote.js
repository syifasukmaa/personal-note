import React from 'react';

function SearchInputNote({ searchWord }) {
  return (
    <div>
      <input className="input" placeholder="Cari Catatan..." type="text" name="search" onChange={searchWord} />
    </div>
  );
}

export default SearchInputNote;
