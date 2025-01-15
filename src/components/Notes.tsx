import React, { useState, useEffect } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  color: string;
  timestamp: number;
}

export function Notes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('flipwatch-notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    localStorage.setItem('flipwatch-notes', JSON.stringify(notes));
  }, [notes]);

  const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#bdb2ff', '#ffc6ff'];

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote,
        color: colors[Math.floor(Math.random() * colors.length)],
        timestamp: Date.now(),
      };
      setNotes([...notes, note]);
      setNewNote('');
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#fdf0d5] text-[#003049] px-3 xs:px-4 py-2 rounded-lg pl-9 xs:pl-10 text-sm xs:text-base"
          />
          <Search className="absolute left-2.5 xs:left-3 top-2.5 text-[#003049]" size={18} />
        </div>
        <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
          <input
            type="text"
            placeholder="New note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="flex-1 bg-[#fdf0d5] text-[#003049] px-3 xs:px-4 py-2 rounded-lg text-sm xs:text-base"
          />
          <button
            onClick={addNote}
            className="bg-[#fdf0d5] text-[#003049] px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm xs:text-base"
          >
            <Plus size={18} className="xs:w-5 xs:h-5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
        {filteredNotes.map(note => (
          <div
            key={note.id}
            style={{ backgroundColor: note.color }}
            className="p-3 xs:p-4 rounded-lg relative group"
          >
            <p className="text-[#003049] whitespace-pre-wrap break-words text-sm xs:text-base">{note.content}</p>
            <button
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="text-[#003049] w-4 h-4 xs:w-5 xs:h-5" />
            </button>
            <div className="text-[0.65rem] xs:text-xs text-[#003049]/70 mt-2">
              {new Date(note.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}