import React, { useState, useEffect } from 'react';

interface ClockProps {
  is24Hour: boolean;
}

export function Clock({ is24Hour }: ClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = is24Hour ? time.getHours() : time.getHours() % 12 || 12;
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const period = time.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <div className="text-center">
      <div className="flex flex-wrap justify-center items-center gap-1.5 xs:gap-2">
        <div className="bg-[#fdf0d5] text-[#003049] p-2 xs:p-3 sm:p-4 rounded-lg min-w-[60px] xs:min-w-[70px] sm:min-w-[90px]">
          <span className="text-xl xs:text-2xl sm:text-4xl font-bold">{hours}</span>
        </div>
        <span className="text-xl xs:text-2xl sm:text-4xl">:</span>
        <div className="bg-[#fdf0d5] text-[#003049] p-2 xs:p-3 sm:p-4 rounded-lg min-w-[60px] xs:min-w-[70px] sm:min-w-[90px]">
          <span className="text-xl xs:text-2xl sm:text-4xl font-bold">{minutes}</span>
        </div>
        <span className="text-xl xs:text-2xl sm:text-4xl">:</span>
        <div className="bg-[#fdf0d5] text-[#003049] p-2 xs:p-3 sm:p-4 rounded-lg min-w-[60px] xs:min-w-[70px] sm:min-w-[90px]">
          <span className="text-xl xs:text-2xl sm:text-4xl font-bold">{seconds}</span>
        </div>
        {!is24Hour && (
          <div className="bg-[#fdf0d5] text-[#003049] p-2 xs:p-3 sm:p-4 rounded-lg min-w-[50px] xs:min-w-[60px] sm:min-w-[70px]">
            <span className="text-lg xs:text-xl sm:text-2xl font-bold">{period}</span>
          </div>
        )}
      </div>
      <div className="mt-3 sm:mt-4 text-[#fdf0d5] text-xs xs:text-sm sm:text-base">
        {time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
}