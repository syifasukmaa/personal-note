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
            activeNote: true,
            archiveNote: false,
        };
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
        this.allNoteList = this.allNoteList.bind(this);
        this.archiveNoteHandler = this.archiveNoteHandler.bind(this);
        this.toggleActiveNote = this.toggleActiveNote.bind(this);
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

    toggleActiveNote() {
        this.setState((prevState) => ({
            ...prevState,
            activeNote: !prevState.activeNote,
        }));
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
                    <div className="flex items-center justify-between py-4 px-4 md:px-4 lg:px-28">
                        <h1 className="text-4xl font-bold text-sky-500">Notes</h1>
                        <div className="flex flex-row items-center gap-2 ">
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

                    <div className="w-full p-4 mx-auto md:w-3/4 xl:w-3/6 border border-gray-300 rounded-xl mt-10 bg-white dark:bg-dark/20 dark:text-secondary drop-shadow-lg dark:drop-shadow-white ">
                        <h2 className="pt-4 text-2xl font-bold text-primary dark:text-secondary">Buat Catatan</h2>

                        <InputNote addNote={this.addNoteHandler} />
                    </div>

                    {/* bikin switch toggle gitu */}
                    <div className="container-note">
                        <div className="flex items-center justify-center bg-primary w-[200px] h-10 mt-10 rounded-lg mb-2">
                            <button className={`w-1/2 px-4 py-2 rounded-lg ${this.state.activeNote ? "bg-sky-500 text-white font-bold" : "bg-primary text-white text-xs"}`} onClick={() => this.toggleActiveNote()}>Aktif</button>
                            <button className={`w-1/2 px-4 py-2 rounded-lg ${!this.state.activeNote ? "bg-sky-500 text-white font-bold" : "bg-primary/10 text-white text-xs"}`} onClick={() => this.toggleActiveNote()}>Arsip</button>
                        </div>


                        {
                            this.state.activeNote ? (
                                <div>
                                    <h2 className="heading-2 dark:text-secondary">Catatan Aktif</h2>

                                    {this.allNoteList().filter((note) => !note.archived).length === 0 ? <h1 className="note-empty">Catatan Kosong</h1> : null}

                                    <div className="item-note">
                                        <NoteList listNote={this.allNoteList().filter((note) => !note.archived)} deleteNote={this.deleteNoteHandler} archiveNote={this.archiveNoteHandler} />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="heading-2 dark:text-secondary">Arsip</h2>

                                    {this.allNoteList().filter((note) => note.archived).length === 0 ? <h1 className="note-empty">Tidak Ada Arsip</h1> : null}

                                    <div className="item-note">
                                        <NoteList listNote={this.allNoteList().filter((note) => note.archived)} deleteNote={this.deleteNoteHandler} archiveNote={this.archiveNoteHandler} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default App;
