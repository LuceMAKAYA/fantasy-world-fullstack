import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="app-footer" role="contentinfo">
            <div className="footer-content">
                <p>⚔ Fantasy World — Full Stack Project</p>
            </div>
        </footer>
    );
};

export default Footer;