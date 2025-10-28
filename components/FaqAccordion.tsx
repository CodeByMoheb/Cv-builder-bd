import React, { useState } from 'react';
import { ChevronDownIcon } from './ui/Icons';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border rounded-lg overflow-hidden bg-white shadow-sm">
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex justify-between items-center text-left p-4 focus:outline-none focus:bg-gray-50"
            aria-expanded={openIndex === index}
          >
            <span className="font-medium text-gray-800">{item.question}</span>
            <ChevronDownIcon
              className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
            />
          </button>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
          >
            <div className="p-4 pt-0 text-gray-600">
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
