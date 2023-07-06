import React from 'react';
import SearchInput from './components/SearchInputNote';
import InputNote from './components/InputNotes';
import { getInitialData } from './utils';
import NoteList from './components/NoteList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      notes: getInitialData(),
    };
    // this.setStorage = localStorage.setItem('notes', JSON.stringify(this.state.notes));
    this.allNoteList = this.allNoteList.bind(this);
    this.archiveNoteHandler = this.archiveNoteHandler.bind(this);
  }

  addNoteHandler = ({ title, body }) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          notes: [
            ...prevState.notes,
            {
              id: +new Date(),
              title,
              body,
              createdAt: new Date().toISOString(),
              archived: false,
            },
          ],
        };
      },
      () => {
        localStorage.setItem('notes', JSON.stringify(this.state.notes));
      }
    );
  };

  localStorageIndex = (id) => {
    let dataJson = JSON.parse(localStorage.getItem('notes'));

    const editToDoIndex = dataJson.findIndex((note) => {
      return note.id === id;
    });

    dataJson.splice(editToDoIndex, 1);
    if (localStorage.getItem('notes')) {
      localStorage.setItem('notes', JSON.stringify(dataJson));
    } else {
      console.log('localstorage belum berjalan');
    }
  };

  deleteNoteHandler = (id) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          notes: prevState.notes.filter((note) => note.id !== id),
        };
      },
      () => {
        localStorage.setItem('notes', JSON.stringify(this.state.notes));
      }
    );
  };

  searchWordHandler = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        ...prevState,
        searchQuery: event.target.value,
      };
    });
  };

  archiveNoteHandler(id) {
    let dataJson = JSON.parse(localStorage.getItem('notes'));
    if (localStorage.getItem('notes')) {
      dataJson.forEach((note) => {
        const editToDoIndex = dataJson.findIndex((note) => {
          return note.id === id;
        });
        dataJson[editToDoIndex].archived = !dataJson[editToDoIndex].archived;
      });

      localStorage.setItem('notes', JSON.stringify(dataJson));
    }

    const { notes } = this.state;
    notes.forEach((note) => {
      if (note.id === id) note.archived = !note.archived;
    });
    this.setState((prevState) => ({ ...prevState, notes }), localStorage.setItem('notes', JSON.stringify(this.state.notes)));
  }

  allNoteList() {
    const { searchQuery, notes } = this.state;

    const list = searchQuery.trim().length ? notes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase())) : notes;

    return list.sort((a, b) => new Date(a) - new Date(b));
  }

  componentDidMount() {
    console.log('notes active');
    if (localStorage.getItem('notes')) {
      this.setState(() => {
        let documentData = JSON.parse(localStorage.getItem('notes'));
        return {
          notes: [...documentData],
        };
      });
    }
  }

  render() {
    return (
      <>
        <div className="w-full bg-slate-100">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-4xl font-bold text-sky-500">Notes</h1>
            <SearchInput searchWord={this.searchWordHandler} />
          </div>

          <hr className="w-full h-[2px] bg-gray-200 border-0 dark:bg-gray-800"></hr>

          <div className="w-full p-4 mx-auto md:w-3/4 xl:w-3/6">
            <h2 className="pt-4 text-2xl font-bold text-primary">Buat Catatan</h2>

            <InputNote addNote={this.addNoteHandler} />
          </div>

          <div className="w-full px-4 xl:px-32 pb-7">
            <h2 className="pt-4 mb-5 text-2xl font-bold text-primary">Catatan Aktif</h2>

            {this.allNoteList().filter((note) => !note.archived).length === 0 ? <h1 className="text-3xl font-semibold text-center text-red-600">Catatan Kosong</h1> : null}

            <div className="grid gap-2 lg:grid-cols-4 md:grid-cols-2">
              <NoteList listNote={this.allNoteList().filter((note) => !note.archived)} deleteNote={this.deleteNoteHandler} archiveNote={this.archiveNoteHandler} />
            </div>
          </div>

          <div className="w-full px-4 xl:px-32 pb-7">
            <h2 className="pt-4 mb-5 text-2xl font-bold text-primary">Arsip</h2>

            {this.allNoteList().filter((note) => note.archived).length === 0 ? <h1 className="text-3xl font-semibold text-center text-red-600">Tidak Ada Arsip</h1> : null}

            <div className="grid gap-2 lg:grid-cols-4 md:grid-cols-2">
              <NoteList listNote={this.allNoteList().filter((note) => note.archived)} deleteNote={this.deleteNoteHandler} archiveNote={this.archiveNoteHandler} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
