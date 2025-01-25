
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#2d3e50] text-white px-10 py-5 flex justify-between items-center">
            <div className="flex space-x-5">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f39c12]">Facebook</a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f39c12]">Twitter</a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f39c12]">LinkedIn</a>
            </div>
            <div className="flex space-x-5">
                <a href="/privacy" className="hover:text-[#f39c12]">Privacy Policy</a>
                <a href="/terms" className="hover:text-[#f39c12]">Terms of Service</a>
                <a href="/help" className="hover:text-[#f39c12]">Help</a>
            </div>
        </footer>
    );
};

export default Footer;