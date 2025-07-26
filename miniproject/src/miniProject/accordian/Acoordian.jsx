import React, { useState } from 'react';

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const items = [
        {
            title: "What is React?",
            content: "React is a JavaScript library for building user interfaces, maintained by Facebook."
        },
        {
            title: "What is a component?",
            content: "A component is a reusable piece of code that returns a React element to be rendered to the page."
        },
        {
            title: "What is JSX?",
            content: "JSX is a syntax extension for JavaScript that allows writing HTML directly within React code."
        },
        {
            title: "What is a state in React?",
            content: "State is a built-in object that stores property values that belong to a component."
        },
        {
            title: "What are props in React?",
            content: "Props are inputs to components used to pass data and event handlers down to child components."
        },
        {
            title: "What is useEffect used for?",
            content: "The useEffect hook lets you perform side effects in function components, such as data fetching or DOM manipulation."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-600/20"></div>
                <div className="relative z-10 bg-white/80 backdrop-blur-sm">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`border-b border-gray-200 last:border-b-0 ${activeIndex === index ? 'bg-indigo-50' : ''
                                }`}
                        >
                            <button
                                className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-700 hover:text-indigo-600 focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={activeIndex === index}
                                aria-controls={`accordion-content-${index}`}
                            >
                                <span>{item.title}</span>
                                <svg
                                    className={`w-5 h-5 text-indigo-600 transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            <div
                                id={`accordion-content-${index}`}
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-4 pt-0 text-gray-600">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .transition-all {
                    transition-property: all;
                }

                .duration-300 {
                    transition-duration: 300ms;
                }

                .ease-in-out {
                    transition-timing-function: ease-in-out;
                }

                .backdrop-blur-sm {
                    backdrop-filter: blur(4px);
                }

                .bg-white\/80 {
                    background-color: rgba(255, 255, 255, 0.8);
                }

                .bg-indigo-50 {
                    background-color: #eef2ff;
                }

                .from-purple-500\/20 {
                    background-color: rgba(168, 85, 247, 0.2);
                }

                .to-indigo-600\/20 {
                    background-color: rgba(79, 70, 229, 0.2);
                }
            `}</style>
        </div>
    );
};

export default Accordion;