import React, { useState, useRef, useEffect } from 'react';

interface EditableCellProps {
  value: string;
  onSave: (newValue: string) => void;
  type?: 'text' | 'select';
  options?: string[];
  className?: string;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value,
  onSave,
  type = 'text',
  options = [],
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (isEditing) {
      if (type === 'text' && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      } else if (type === 'select' && selectRef.current) {
        selectRef.current.focus();
      }
    }
  }, [isEditing, type]);

  const handleSave = () => {
    if (editValue !== value) {
      onSave(editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    if (type === 'select') {
      return (
        <select
          ref={selectRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyPress}
          className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-rose-300 ${className}`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyPress}
        className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-rose-300 ${className}`}
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors duration-200 ${className}`}
      title="Click to edit"
    >
      {value || 'Click to edit'}
    </div>
  );
};

export default EditableCell;