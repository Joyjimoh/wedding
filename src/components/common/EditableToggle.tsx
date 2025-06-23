import React from 'react';

interface EditableToggleProps {
  value: boolean;
  onToggle: (newValue: boolean) => void;
  className?: string;
}

const EditableToggle: React.FC<EditableToggleProps> = ({
  value,
  onToggle,
  className = ''
}) => {
  return (
    <label className={`flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onToggle(e.target.checked)}
        className="sr-only"
      />
      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
        value 
          ? 'bg-green-200 border-green-400' 
          : 'bg-red-200 border-red-400'
      }`}>
        {value && (
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </label>
  );
};

export default EditableToggle;