import React from 'react';
import { Cog } from 'lucide-react';

interface SettingsProps {
  is24Hour: boolean;
  setIs24Hour: (value: boolean) => void;
}

export function Settings({ is24Hour, setIs24Hour }: SettingsProps) {
  return (
    <div className="relative group">
      <button className="p-2 hover:bg-[#fdf0d5]/10 rounded-lg">
        <Cog className="text-[#fdf0d5]" size={24} />
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-[#fdf0d5] text-[#003049] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <div className="p-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={is24Hour}
              onChange={(e) => setIs24Hour(e.target.checked)}
              className="form-checkbox"
            />
            <span>24-hour format</span>
          </label>
        </div>
      </div>
    </div>
  );
}