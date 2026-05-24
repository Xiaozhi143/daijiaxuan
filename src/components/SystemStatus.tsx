import { useState, useEffect } from 'react';

const SystemStatus = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
      setDate(now.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <div className="absolute top-24 right-6 text-right space-y-2">
        <div className="text-xs text-gray-500 font-mono">
          {time}
        </div>
        <div className="text-xs text-gray-600 font-mono">
          {date}
        </div>
      </div>

      <div className="absolute bottom-6 right-6 text-right">
        <div className="text-xs text-gray-600 font-mono">
          <span className="text-[#e6d5a7]">◇</span> AWAKE
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
