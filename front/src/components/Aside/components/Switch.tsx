import React, { useState } from 'react';
import { AsideDto } from '../../Enviroment/dtos/Aside';

const Switch = ({ aside }:{aside:AsideDto}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    aside.setIsDoubleChest(newCheckedState);
  };

  return (
    <div className="flex items-center gap-4">
       
      <label htmlFor="toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            id="toggle"
            checked={isChecked}
            onChange={handleClick}
            className="sr-only"
          />
          <div
            className={`block w-14 h-8 rounded-full ${
              isChecked ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
              isChecked ? 'translate-x-6' : ''
            }`}
          ></div>
        </div>
      </label>
      <span className="ml-2 text-[#ffffff]">
       É um Baú Duplo?
      </span> 
    </div>
  );
};

export default Switch;
