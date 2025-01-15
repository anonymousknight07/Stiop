import  { useState, useEffect } from 'react';
import { Search, Plus, Trash2, Bold, Italic, List, Link, ArrowUp, ArrowDown } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface Note {
  id: string;
  content: string;
  color: string;
  timestamp: number;
}

interface SearchMatch {
  noteId: string;
  matches: number;
  currentMatch: number;
}

export function Notes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('flipwatch-notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [newNote, setNewNote] = useState('');
  const [showFormatting, setShowFormatting] = useState(false);
  const [searchMatches, setSearchMatches] = useState<SearchMatch[]>([]);
  const [totalMatches, setTotalMatches] = useState(0);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem('flipwatch-notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'gi');
      let total = 0;
      const matches = notes.map(note => {
        const matches = (note.content.match(regex) || []).length;
        total += matches;
        return {
          noteId: note.id,
          matches,
          currentMatch: 0
        };
      }).filter(match => match.matches > 0);
      
      setSearchMatches(matches);
      setTotalMatches(total);
      setCurrentMatchIndex(total > 0 ? 1 : 0);
    } else {
      setSearchMatches([]);
      setTotalMatches(0);
      setCurrentMatchIndex(0);
    }
  }, [searchTerm, notes]);

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

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById('newNoteInput') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    let insertion = '';
    switch (format) {
      case 'bold':
        insertion = `**${text.slice(start, end) || 'bold text'}**`;
        break;
      case 'italic':
        insertion = `*${text.slice(start, end) || 'italic text'}*`;
        break;
      case 'bullet':
        insertion = `\n- ${text.slice(start, end) || 'list item'}`;
        break;
      case 'link':
        insertion = `[${text.slice(start, end) || 'link text'}](url)`;
        break;
    }

    const newText = text.slice(0, start) + insertion + text.slice(end);
    setNewNote(newText);
    
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + insertion.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const renderMarkdown = (content: string) => {
    const html = marked(content, { breaks: true });
    const sanitized = DOMPurify.sanitize(html);
    return { __html: sanitized };
  };

  const navigateMatches = (direction: 'next' | 'prev') => {
    if (totalMatches === 0) return;
    
    let newIndex = direction === 'next' 
      ? (currentMatchIndex % totalMatches) + 1
      : currentMatchIndex - 1;
    
    if (newIndex < 1) newIndex = totalMatches;
    setCurrentMatchIndex(newIndex);
  };

  const highlightSearch = (content: string, noteId: string) => {
    if (!searchTerm) return renderMarkdown(content);
    
    const html = marked(content, { breaks: true });
    const sanitized = DOMPurify.sanitize(html);
    
    const noteMatch = searchMatches.find(match => match.noteId === noteId);
    if (!noteMatch) return { __html: sanitized };

    let matchCount = 0;
    const highlighted = sanitized.replace(
      new RegExp(searchTerm, 'gi'),
      (match) => {
        matchCount++;
        const isCurrentMatch = noteMatch.matches > 0 && 
          matchCount === currentMatchIndex;
        return `<mark class="bg-yellow-200 text-[#003049] ${
          isCurrentMatch ? 'ring-2 ring-[#003049]' : ''
        }">${match}</mark>`;
      }
    );
    return { __html: highlighted };
  };

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#fdf0d5] text-[#003049] px-3 xs:px-4 py-2 rounded-lg pl-9 xs:pl-10 text-sm xs:text-base"
            />
            <Search className="absolute left-2.5 xs:left-3 top-2.5 text-[#003049]" size={18} />
          </div>
          {searchTerm && (
            <div className="flex items-center gap-2 bg-[#fdf0d5] px-3 rounded-lg">
              <button
                onClick={() => navigateMatches('prev')}
                className="hover:bg-[#003049]/10 p-1 rounded"
                disabled={totalMatches === 0}
              >
                <ArrowUp size={18} />
              </button>
              <span className="text-sm">
                {totalMatches > 0 ? `${currentMatchIndex}/${totalMatches}` : 'No matches'}
              </span>
              <button
                onClick={() => navigateMatches('next')}
                className="hover:bg-[#003049]/10 p-1 rounded"
                disabled={totalMatches === 0}
              >
                <ArrowDown size={18} />
              </button>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              onClick={() => setShowFormatting(!showFormatting)}
              className="bg-[#fdf0d5] text-[#003049] px-3 py-1 rounded-lg text-sm"
            >
              {showFormatting ? 'Hide Formatting' : 'Show Formatting'}
            </button>
          </div>
          {showFormatting && (
            <div className="flex flex-wrap gap-2 bg-[#fdf0d5] p-2 rounded-lg">
              <button
                onClick={() => insertFormatting('bold')}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#003049]/10"
                title="Bold (**text**)"
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => insertFormatting('italic')}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#003049]/10"
                title="Italic (*text*)"
              >
                <Italic size={16} />
              </button>
              <button
                onClick={() => insertFormatting('bullet')}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#003049]/10"
                title="Bullet List (- item)"
              >
                <List size={16} />
              </button>
              <button
                onClick={() => insertFormatting('link')}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#003049]/10"
                title="Link [text](url)"
              >
                <Link size={16} />
              </button>
            </div>
          )}
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
            <textarea
              id="newNoteInput"
              placeholder="New note... (Supports Markdown: **bold**, *italic*, - bullets, [links](url))"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="flex-1 bg-[#fdf0d5] text-[#003049] px-3 xs:px-4 py-2 rounded-lg text-sm xs:text-base min-h-[100px]"
            />
            <button
              onClick={addNote}
              className="bg-[#fdf0d5] text-[#003049] px-4 py-2 rounded-lg flex items-center justify-center gap-2 h-fit"
            >
              <Plus size={18} className="xs:w-5 xs:h-5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
        {filteredNotes.map(note => (
          <div
            key={note.id}
            style={{ backgroundColor: note.color }}
            className="p-3 xs:p-4 rounded-lg relative group"
          >
            <div
              className="prose prose-sm text-[#003049] break-words"
              dangerouslySetInnerHTML={highlightSearch(note.content, note.id)}
            />
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