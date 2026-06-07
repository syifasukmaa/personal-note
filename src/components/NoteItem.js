import React from "react";
import NoteItemBody from "./NoteItemBody";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";

function NoteItem({ note, deleteNote, archiveNote }) {
    return (
        <div className="flex flex-col justify-between rounded-xl  border-2  border-primary">
            <div className="py-2 px-4">
                <NoteItemBody title={note.title} createdAt={note.createdAt} body={note.body} />
            </div>
            <div className="flex justify-center w-full ">
                <DeleteButton deleteNote={() => deleteNote(note.id)} />
                <ArchiveButton archived={note.archived} archiveNote={() => archiveNote(note.id)} />
            </div>
        </div>
    );
}
export default NoteItem;
