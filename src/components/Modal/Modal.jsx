// Modal.tsx
import React from 'react';
import Button from './ModalButton';

export const Modal = ({ onClose, children, buttons }) => {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white w-[70%] p-8 rounded-lg mb-2 items-center justify-center border-solid border-2 flex flex-col border-green-800">
        {children}
        <div className='flex justify-around w-[90%] mt-2'>
        {buttons &&
          buttons.map((button, index) => (
            <Button
              key={index}
              title={button.label}
              bg={button.bg}
              text={button.text}
              onClick={button.onClick}
            />
          ))}
        <Button title="Close" bg="#7152F3" text="white" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
