import React from "react";
import heroImage from "./static/hero-ithink.png";

function Footer() {
    return (
        <footer className="w-full bg-gray-800 py-4">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-0 text-white">
            <div className="w-full text-center">
            <p>Made with ❤️🍺 by The Binary Bandits</p>
            </div>
            <div className="flex justify-end">
            <img src={heroImage} alt="iThink" className="w-16 h-16" />
            </div>
        </div>
        </footer>
    );
}

export default Footer;
