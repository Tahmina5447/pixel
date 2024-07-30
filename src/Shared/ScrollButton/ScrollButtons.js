

// components/ScrollButtons.js

import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ScrollButtons = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    return (
        <div className="fixed bottom-[130px]  md:bottom-4 right-4 z-50 flex flex-col gap-4">
            {isVisible && (
                <button
                    className=" bg-primary hover:text-black duration-150 text-white font-bold p-2 rounded-full focus:outline-none focus:shadow-outline"
                    onClick={scrollToTop}
                >
                    <FaArrowUp size={18} />
                </button>
            )}
            {/* <button
                className="bg-primary hover:text-black text-white duration-150 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={scrollToBottom}
            >
                <FaArrowDown />
            </button> */}
        </div>
    );
};

export default ScrollButtons;
