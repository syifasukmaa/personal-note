import React from "react";

function DeleteButton({ deleteNote }) {
    return (
        <button className="text-red-500 button-base hover:text-red-800 bg-red-500/10 dark:bg-red-500/10" onClick={deleteNote}>
            Delete
        </button>
    );
}

export default DeleteButton;
