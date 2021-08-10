import React, { useState, useReducer } from 'react'
import './App.css';
import { v4 as uuid } from 'uuid'

const initialState = {
    lastNoteCreatedAt: null,
    totalNotes: 0,
    notes: []
}

const notesReducer = (prevState, action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            const newNote = {
                lastNoteCreatedAt: new Date().toTimeString().slice(0, 8),
                totalNotes: prevState.notes.length + 1,
                notes: [...prevState.notes, action.payload]
            }
            return newNote;

        case 'DELETE_NOTE':
            const deleteNote = {
                ...prevState,
                totalNotes: prevState.notes.length - 1,
                notes: prevState.notes.filter(note => note.id !== action.payload.id)
            }
            return deleteNote

        default:
            return prevState;
    }
}


const Home = () => {
    const [notesState, dispatch] = useReducer(notesReducer, initialState)
    const [noteText, setNoteText] = useState('')

    const addNote = (e) => {
        e.preventDefault();

        if (!noteText) {
            return;
        }

        const newNote = {
            id: uuid(),
            text: noteText,
            rotate: Math.floor(Math.random() * 20)
        }

        dispatch({ type: 'ADD_NOTE', payload: newNote })
        setNoteText('')
    }

    const clear = () => {
        setNoteText('')
    }

    const dropNote = (e) => {
        e.target.style.left = `${e.pageX - 50}px`;
        e.target.style.top = `${e.pageY - 50}px`;
    }

    const dragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const deleteNote = (id) => {
        console.log('delete')
        dispatch({ type: 'DELETE_NOTE', payload: id })
    }

    let i = 0
    const randomColor = () => {
        let random_color = ['#c2ff3d', '#04e022', '#fff740', '#ff3de8', '#3dc2ff', '#bc83e6']
        if (i > random_color.length - 1) {
            i = 0
        }
        console.log('ok');
        return random_color[i++]
    }



    return (
        <div className="App" onDragOver={dragOver}>
            <div className="container">
                <h1>Sticky Note</h1>

                <div>
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#declineModal">
                        Create Note
                    </button>

                    <div class="modal fade" id="declineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content modalStyle">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Add New Note</h5>
                                </div>
                                <div class="modal-body">
                                    <form className="main-form" onSubmit={addNote}>
                                        <textarea placeholder="Write Note..."
                                            value={noteText}
                                            onChange={(e) => setNoteText(e.target.value)}
                                        ></textarea>

                                        <button onClick={(e)=>clear()} id="x-icon" type="button" class="btn btn-secondary" data-dismiss="modal"></button>
                                        
                                        <button></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='display-note'>
                        {notesState.notes.map((note) => (
                            <div className="note"
                                style={{ backgroundColor: `${randomColor()}`, transform: `rotate(${3}deg)` }}
                                key={note.id}
                                draggable="true"
                                onDragEnd={dropNote}
                            >
                                <h4 className="text">{note.text}</h4>
                                <button className="delete-btn" onClick={() => deleteNote(note)}>
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;

