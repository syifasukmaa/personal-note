import React from "react";
import SearchInput from "./components/SearchInputNote";
import InputNote from "./components/InputNotes";
import { getInitialData } from "./utils";
import NoteList from "./components/NoteList";
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            notes: getInitialData(),
            darkMode: false,
        };
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
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
                localStorage.setItem("notes", JSON.stringify(this.state.notes));
            },
        );
    };

    localStorageIndex = (id) => {
        let dataJson = JSON.parse(localStorage.getItem("notes"));

        const editToDoIndex = dataJson.findIndex((note) => {
            return note.id === id;
        });

        dataJson.splice(editToDoIndex, 1);
        if (localStorage.getItem("notes")) {
            localStorage.setItem("notes", JSON.stringify(dataJson));
        } else {
            console.log("localstorage belum berjalan");
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
                localStorage.setItem("notes", JSON.stringify(this.state.notes));
            },
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
        let dataJson = JSON.parse(localStorage.getItem("notes"));
        if (localStorage.getItem("notes")) {
            dataJson.forEach((note) => {
                const editToDoIndex = dataJson.findIndex((note) => {
                    return note.id === id;
                });
                dataJson[editToDoIndex].archived = !dataJson[editToDoIndex].archived;
            });

            localStorage.setItem("notes", JSON.stringify(dataJson));
        }

        const { notes } = this.state;
        notes.forEach((note) => {
            if (note.id === id) note.archived = !note.archived;
        });
        this.setState((prevState) => ({ ...prevState, notes }), localStorage.setItem("notes", JSON.stringify(this.state.notes)));
    }

    allNoteList() {
        const { searchQuery, notes } = this.state;

        const list = searchQuery.trim().length ? notes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase())) : notes;

        return list.sort((a, b) => new Date(a) - new Date(b));
    }
    toggleDarkMode() {
        this.setState(
            (prevState) => ({
                darkMode: !prevState.darkMode,
            }),
            () => {
                if (this.state.darkMode) {
                    document.documentElement.classList.add("dark");
                    localStorage.setItem("theme", "dark");
                } else {
                    document.documentElement.classList.remove("dark");
                    localStorage.setItem("theme", "light");
                }
            },
        );
    }
    componentDidMount() {
        const isDark = localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);

        if (isDark) {
            document.documentElement.classList.add("dark");

            this.setState({
                darkMode: true,
            });
        } else {
            document.documentElement.classList.remove("dark");

            this.setState({
                darkMode: false,
            });
        }

        if (localStorage.getItem("notes")) {
            this.setState({
                notes: JSON.parse(localStorage.getItem("notes")),
            });
        }
    }

    render() {
        return (
            <>
                <div className="w-full bg-slate-100 dark:bg-dark">
                    <div className="flex items-center justify-between p-4">
                        <h1 className="text-4xl font-bold text-sky-500">Notes</h1>
                        <div className="flex flex-row items-center gap-2 ">
                            {/* <div className="flex mr-3">
                <span className="mr-2 text-sm dark:text-slate-200">Light</span>
                <input type="checkbox" className="hidden" id="mode-toggle" />
                <label for="mode-toggle">
                  <div className="flex items-center h-5 p-1 rounded-full cursor-pointer w-9 bg-slate-500">
                    <div className="w-4 h-4 bg-white rounded-full toggle-circle"></div>
                  </div>
                </label>
                <span className="ml-2 text-sm text-slate-200">Dark</span>
              </div> */}
                            <button
                                className={`flex items-center justify-center w-10 h-10  transition-all duration-300 mt-2  rounded-full dark:bg-dark300 hover:scale-105 ${this.state.darkMode ? "dark:bg-gray-300/10" : "bg-primary100/10"}`}
                                onClick={() => this.toggleDarkMode()}
                            >
                                {this.state.darkMode ? <MdOutlineWbSunny className="text-xl text-gray-300" /> : <MdOutlineDarkMode className="text-xl text-primary" />}
                            </button>
                            <SearchInput searchWord={this.searchWordHandler} />
                        </div>
                    </div>

                    <hr className="w-full h-[2px] bg-gray-200 border-0 dark:bg-gray-800"></hr>

                    <div className="w-full p-4 mx-auto md:w-3/4 xl:w-3/6">
                        <h2 className="pt-4 text-2xl font-bold text-primary dark:text-secondary">Buat Catatan</h2>

                        <InputNote addNote={this.addNoteHandler} />
                    </div>

                    <div className="container-note">
                        <h2 className="heading-2 dark:text-secondary">Catatan Aktif</h2>

                        {this.allNoteList().filter((note) => !note.archived).length === 0 ? <h1 className="note-empty">Catatan Kosong</h1> : null}

                        <div className="item-note">
                            <NoteList listNote={this.allNoteList().filter((note) => !note.archived)} deleteNote={this.deleteNoteHandler} archiveNote={this.archiveNoteHandler} />
                        </div>
                    </div>

                    <div className="container-note">
                        <h2 className="heading-2 dark:text-secondary">Arsip</h2>

                        {this.allNoteList().filter((note) => note.archived).length === 0 ? <h1 className="note-empty">Tidak Ada Arsip</h1> : null}

                        <div className="item-note">
                            <NoteList listNote={this.allNoteList().filter((note) => note.archived)} deleteNote={this.deleteNoteHandler} archiveNote={this.archiveNoteHandler} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default App;
