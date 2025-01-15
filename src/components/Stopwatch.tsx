import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(time => time + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return (
    <div className="text-center">
      <div className="flex flex-wrap justify-center items-center gap-2 xs:gap-3 sm:gap-4 mb-6">
        <div className="bg-[#023e8a] text-[#90e0ef] p-2 xs:p-3 sm:p-4 rounded-lg min-w-[60px] xs:min-w-[70px] sm:min-w-[80px]">
          <span className="text-xl xs:text-2xl sm:text-4xl font-bold">{hours.toString().padStart(2, '0')}</span>
        </div>
        <span className="text-xl xs:text-2xl sm:text-4xl">:</span>
        <div className="bg-[#023e8a] text-[#90e0ef] p-2 xs:p-3 sm:p-4 rounded-lg min-w-[60px] xs:min-w-[70px] sm:min-w-[80px]">
          <span className="text-xl xs:text-2xl sm:text-4xl font-bold">{minutes.toString().padStart(2, '0')}</span>
        </div>
        <span className="text-xl xs:text-2xl sm:text-4xl">:</span>
        <div className="bg-[#023e8a] text-[#90e0ef] p-2 xs:p-3 sm:p-4 rounded-lg min-w-[60px] xs:min-w-[70px] sm:min-w-[80px]">
          <span className="text-xl xs:text-2xl sm:text-4xl font-bold">{seconds.toString().padStart(2, '0')}</span>
        </div>
        <span className="text-xl xs:text-2xl sm:text-4xl">.</span>
        <div className="bg-[#023e8a] text-[#90e0ef] p-2 xs:p-3 sm:p-4 rounded-lg min-w-[60px] xs:min-w-[70px] sm:min-w-[80px]">
          <span className="text-xl xs:text-2xl sm:text-4xl font-bold">{milliseconds.toString().padStart(2, '0')}</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-[#023e8a] text-[#90e0ef] px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg flex items-center gap-2"
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTime(0);
          }}
          className="bg-[#023e8a] text-[#90e0ef] px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg flex items-center gap-2"
        >
          <RotateCcw size={20} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}