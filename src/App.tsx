import React, { useState } from 'react';
import { Clock } from './components/Clock';
import { Stopwatch } from './components/Stopwatch';
import { Timer } from './components/Timer';
import { Notes } from './components/Notes';
import { Planner } from './components/Planner';
import { Settings } from './components/Settings';
import { Cog, Clock as ClockIcon, Timer as TimerIcon, Watch, StickyNote, Calendar, Menu } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('clock');
  const [is24Hour, setIs24Hour] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'clock', icon: ClockIcon, label: 'Clock' },
    { id: 'stopwatch', icon: Watch, label: 'Stopwatch' },
    { id: 'timer', icon: TimerIcon, label: 'Timer' },
    { id: 'notes', icon: StickyNote, label: 'Notes' },
    { id: 'planner', icon: Calendar, label: 'Planner' },
  ];

  return (
    <div className="min-h-screen bg-[#90e0ef] text-[#023e8a] p-2 xs:p-4">
      <div className="w-full max-w-[95vw] xs:max-w-[90vw] sm:max-w-2xl mx-auto">
        <div className="bg-[#90e0ef]/80 backdrop-blur-lg rounded-lg shadow-xl border border-[#023e8a]/20 p-3 xs:p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-[#023e8a]">Flip Watch</h1>
            <div className="flex items-center gap-2">
              <Settings is24Hour={is24Hour} setIs24Hour={setIs24Hour} />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1.5 xs:p-2 hover:bg-[#023e8a]/10 rounded-lg block sm:hidden"
              >
                <Menu size={20} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'} mb-4`}>
            <div className="flex flex-col gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg w-full ${
                    activeTab === tab.id ? 'bg-[#023e8a] text-[#90e0ef]' : 'text-[#023e8a]'
                  }`}
                >
                  <tab.icon size={18} className="flex-shrink-0" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id ? 'bg-[#023e8a] text-[#90e0ef]' : 'text-[#023e8a]'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-[#90e0ef]/50 p-3 xs:p-4 sm:p-6 rounded-lg border border-[#023e8a]/10">
            {activeTab === 'clock' && <Clock is24Hour={is24Hour} />}
            {activeTab === 'stopwatch' && <Stopwatch />}
            {activeTab === 'timer' && <Timer />}
            {activeTab === 'notes' && <Notes />}
            {activeTab === 'planner' && <Planner />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;