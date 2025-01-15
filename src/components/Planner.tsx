import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, Pin } from 'lucide-react';

interface Task {
  id: string;
  content: string;
  completed: boolean;
  date: string;
  pinned: boolean;
}

export function Planner() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('flipwatch-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    localStorage.setItem('flipwatch-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        content: newTask,
        completed: false,
        date: selectedDate,
        pinned: false,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const togglePin = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, pinned: !task.pinned } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks
    .filter(task => task.date === selectedDate)
    .sort((a, b) => {
      if (a.pinned === b.pinned) return 0;
      return a.pinned ? -1 : 1;
    });

  return (
    <div>
      <div className="mb-4 xs:mb-5 sm:mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-[#023e8a] text-[#90e0ef] px-3 xs:px-4 py-2 rounded-lg mb-3 xs:mb-4 w-full"
        />
        <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
          <input
            type="text"
            placeholder="New task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 bg-[#023e8a] text-[#90e0ef] px-3 xs:px-4 py-2 rounded-lg placeholder-[#90e0ef]/70"
          />
          <button
            onClick={addTask}
            className="bg-[#023e8a] text-[#90e0ef] px-4 py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="space-y-2 xs:space-y-3">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className={`bg-[#023e8a] text-[#90e0ef] p-3 xs:p-4 rounded-lg flex items-center justify-between group ${
              task.completed ? 'opacity-50' : ''
            } ${task.pinned ? 'border-2 border-[#90e0ef]' : ''}`}
          >
            <div className="flex items-center gap-3 xs:gap-4 flex-1 min-w-0">
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-5 h-5 xs:w-6 xs:h-6 rounded-full border-2 border-[#90e0ef] flex items-center justify-center flex-shrink-0 ${
                  task.completed ? 'bg-[#90e0ef]' : ''
                }`}
              >
                {task.completed && <Check size={14} className="text-[#023e8a]" />}
              </button>
              <span className={`truncate ${task.completed ? 'line-through' : ''}`}>{task.content}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => togglePin(task.id)}
                className={`transition-opacity ${task.pinned ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              >
                <Pin
                  size={20}
                  className={`transform transition-transform ${task.pinned ? 'rotate-45' : ''}`}
                />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}