import React, { useState, useEffect } from "react";
import heroImage from "./static/hero-ithink.png";

function Footer() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const count = localStorage.getItem("count");
            if (count) {
                setCounter(parseInt(count, 10) + 1);
                localStorage.setItem("count", parseInt(count, 10) + 1);
            } else {
                localStorage.setItem("count", 1);
                setCounter(1);
            }
        }
    }, []);

    return (
        <footer className="w-full bg-gradient-to-r from-purple-900 to-black shadow py-4">
            <div className="container mx-auto flex justify-between items-center px-4 md:px-0 text-white">
                <div className="w-full text-center">
                    <p>Made with ❤️🍺 by The Binary Bandits</p>
                    <p>You have visited this site {counter} times.</p>
                </div>
                <div className="flex justify-end">
                    <img src={heroImage} alt="iThink" className="w-16 h-16" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
