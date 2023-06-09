import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

const Faq = () => {
    const faq = [
        {
            number: 1,
            question: "What happens if I ask the AI to solve world hunger?",
            answer: "The AI will reply with a recipe for a delicious sandwich. Sorry, we're still working on the world hunger thing.",
        },
        {
            number: 2,
            question: "Can the AI make me rich and famous?",
            answer: "Sure, just give it all your personal information, your credit card numbers, and your firstborn child. What could go wrong?",
        },
        {
            number: 3,
            question: "What's the difference between AI and magic?",
            answer: "AI is like magic, but with more bugs and less unicorns.",
        },
        {
            number: 4,
            question: "Can the AI help me find love?",
            answer: "Of course! Just tell it your ideal partner's name, address, social security number, and blood type, and the AI will do the rest. It's not like that's creepy or anything.",
        },
        {
            number: 5,
            question:
                "What if the AI becomes self-aware and takes over the world?",
            answer: "Don't worry, we have a contingency plan: we'll unplug it and plug it back in again. That always works, right?",
        },
    ];

    return (
        <div className="bg-gray-900 pt-40">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/003/216/647/original/faq-frequently-asked-question-concept-with-team-people-free-vector.jpg"
                    alt="Frequently Asked Questions"
                    className="w-full h-full object-cover rounded-lg shadow-xl transform hover:scale-105 transition-all duration-500"
                />
                <h2 className="text-center text-3xl sm:text-5xl text-green-400 font-bold tracking-wider mt-8 mb-4 relative overflow-hidden">
                    <span className="block absolute inset-0 bg-gray-900"></span>
                    <span className="block relative text-gray-200">
                        Frequently Asked Questions about AI
                    </span>
                    <span
                        className="block absolute inset-0 text-green-400 animate-glitch"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            animation: "glitch 1s infinite",
                        }}
                    >
                        Frequently Asked Questions about AI
                    </span>
                </h2>
            </div>

            <dl className="max-w-4xl mx-auto mb-10 h-screen">
                {faq.map((faq) => (
                    <Disclosure key={faq.number}>
                        {({ open }) => (
                            <>
                                <dt
                                    className={`${
                                        open ? "bg-green-400" : "bg-gray-800"
                                    } border-t-2 border-b-2 border-green-400 text-gray-200 py-4 px-6 cursor-pointer`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg md:text-xl font-medium">
                                            {faq.question}
                                        </span>
                                        <ChevronDownIcon
                                            className={`${
                                                open
                                                    ? "transform rotate-180"
                                                    : ""
                                            } w-6 h-6 text-green-400`}
                                        />
                                    </div>
                                </dt>
                                <dd
                                    className={`${
                                        open ? "bg-green-400" : "bg-gray-800"
                                    } border-b-2 border-green-400 text-gray-200 py-4 px-6`}
                                >
                                    <div className="text-base md:text-lg">
                                        {faq.answer}
                                    </div>
                                </dd>
                            </>
                        )}
                    </Disclosure>
                ))}
            </dl>
        </div>
    );
};

export default Faq;
