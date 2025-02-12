import React, { useState } from 'react';
import './Dropdown.css'

function Dropdown({ fullNames, hotTakeId, handleSelect }: {fullNames: Array<string>, hotTakeId: string, handleSelect: (hotTakeId: string, guessFullName: string) => void}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionClick = (fullNameGuessed: string) => {
        setSelectedOption(fullNameGuessed);
        handleSelect(hotTakeId, fullNameGuessed);
        setIsOpen(false);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
                {selectedOption || 'Select an option'}
            </button>
            {isOpen && (
                <ul className="dropdown-list">
                    {fullNames.map((option, index) => (
                        <li key={`option-${index}`} onClick={() => handleOptionClick(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default Dropdown;
