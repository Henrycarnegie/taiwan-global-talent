import type { ReactNode } from 'react';

interface TabButtonProps {
  label: string;
  subLabel?: string;
  isActive: boolean;
  onClick: () => void;
  icon?: ReactNode;
}

export default function TabButton({ label, subLabel, isActive, onClick, icon }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-full flex flex-col justify-center px-3 border-b-2 text-left transition-all relative ${
        isActive 
          ? 'border-blue-600 text-blue-600 font-semibold' 
          : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-sm">{icon}</span>}
        <span className="text-sm tracking-wide">{label}</span>
      </div>
      {subLabel && (
        <span className="text-[10px] opacity-70 font-normal tracking-wider -mt-0.5">
          {subLabel}
        </span>
      )}
    </button>
  );
}