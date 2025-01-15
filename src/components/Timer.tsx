import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function Timer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputHours, setInputHours] = useState('0');
  const [inputMinutes, setInputMinutes] = useState('0');
  const [inputSeconds, setInputSeconds] = useState('0');

  useEffect(() => {
    let intervalId: number;
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    const totalSeconds = 
      parseInt(inputHours) * 3600 + 
      parseInt(inputMinutes) * 60 + 
      parseInt(inputSeconds);
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center">
      {!isRunning && timeLeft === 0 ? (
        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          <div>
            <input
              type="number"
              min="0"
              max="23"
              value={inputHours}
              onChange={(e) => setInputHours(e.target.value)}
              className="bg-[#fdf0d5] text-[#003049] p-3 sm:p-4 rounded-lg w-16 sm:w-20 text-xl sm:text-2xl"
            />
            <div className="text-xs sm:text-sm mt-2">Hours</div>
          </div>
          <div>
            <input
              type="number"
              min="0"
              max="59"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              className="bg-[#fdf0d5] text-[#003049] p-3 sm:p-4 rounded-lg w-16 sm:w-20 text-xl sm:text-2xl"
            />
            <div className="text-xs sm:text-sm mt-2">Minutes</div>
          </div>
          <div>
            <input
              type="number"
              min="0"
              max="59"
              value={inputSeconds}
              onChange={(e) => setInputSeconds(e.target.value)}
              className="bg-[#fdf0d5] text-[#003049] p-3 sm:p-4 rounded-lg w-16 sm:w-20 text-xl sm:text-2xl"
            />
            <div className="text-xs sm:text-sm mt-2">Seconds</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
          <div className="bg-[#fdf0d5] text-[#003049] p-3 sm:p-4 rounded-lg min-w-[80px] sm:min-w-[100px]">
            <span className="text-2xl sm:text-4xl font-bold">{hours.toString().padStart(2, '0')}</span>
          </div>
          <span className="text-2xl sm:text-4xl">:</span>
          <div className="bg-[#fdf0d5] text-[#003049] p-3 sm:p-4 rounded-lg min-w-[80px] sm:min-w-[100px]">
            <span className="text-2xl sm:text-4xl font-bold">{minutes.toString().padStart(2, '0')}</span>
          </div>
          <span className="text-2xl sm:text-4xl">:</span>
          <div className="bg-[#fdf0d5] text-[#003049] p-3 sm:p-4 rounded-lg min-w-[80px] sm:min-w-[100px]">
            <span className="text-2xl sm:text-4xl font-bold">{seconds.toString().padStart(2, '0')}</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4">
        {!isRunning && timeLeft === 0 ? (
          <button
            onClick={startTimer}
            className="bg-[#fdf0d5] text-[#003049] px-6 py-3 rounded-lg flex items-center space-x-2"
          >
            <Play size={20} />
            <span>Start</span>
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="bg-[#fdf0d5] text-[#003049] px-6 py-3 rounded-lg flex items-center space-x-2"
            >
              {isRunning ? <Pause size={20} /> : <Play size={20} />}
              <span>{isRunning ? 'Pause' : 'Resume'}</span>
            </button>
            <button
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(0);
              }}
              className="bg-[#fdf0d5] text-[#003049] px-6 py-3 rounded-lg flex items-center space-x-2"
            >
              <RotateCcw size={20} />
              <span>Reset</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}