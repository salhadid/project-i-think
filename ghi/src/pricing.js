import React from "react";

const Pricing = () => {
    const CheckIcon = () => (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="self-center flex-shrink-0 mr-2 h-5 w-5 text-green-500"
        viewBox="0 0 20 20"
        fill="currentColor"
        >
        <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
        />
        </svg>
    );
    const XIcon = () => (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="self-center flex-shrink-0 mr-2 h-5 w-5 text-red-500"
        viewBox="0 0 20 20"
        fill="currentColor"
        >
        <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
        />
        </svg>
    );

    return (
        <div className="w-full py-10 px-5 flex flex-col items-center bg-gradient-to-tr from-purple-700 via-blue-500 to-green-300 font-body pt-20">
            {/* Container */}
            {/* :TITLE */}
            <div className="mb-16 text-center text-white">
            <h1 className="font-title py-2 text-5xl font-black tracking-wider antialiased">
                iThink Pricing Table
            </h1>
            <p className="text-lg">
                Revolutionize your brainstorming
                process with our intuitive and
                powerful AI-powered brainstorming tool! <br />
                by Binary Bandits.
            </p>
            </div>
            {/* :PRICING TABLES */}
            <div className="grid grid-cols-3 gap-6 max-w-7xl">
            {/* ::Offer 1 */}
            <div className="col-span-3 lg:col-span-1 my-4 py-9 px-12 flex flex-col items-center bg-white text-gray-600 rounded-2xl shadow-xl">
                {/* Offer name */}
                <h2 className="font-title mb-1 text-xl font-semibold uppercase tracking-wider">
                Basic
                </h2>
                {/* Price */}
                <div className="p-4 flex items-baseline">
                <h3 className="font-title text-5xl font-bold ">$59</h3>
                <span className="ml-2">/ month</span>
                </div>
                {/* Divide line */}
                <span className="w-28 h-1.5 bg-green-500 rounded-3xl" />
                {/* Features */}
                <ul className="my-12 flex flex-col">
                <li className="mb-4 inline-flex">
                    <CheckIcon />
                    Unlimited brainstorming sessions.
                </li>
                <li className="mb-4 inline-flex">
                    <CheckIcon />
                    Access to basic AI-powered insights.
                </li>
                <li className="mb-4 inline-flex">
                    <CheckIcon />
                    24/7 customer support.
                </li>
                <li className="mb-4 inline-flex line-through">
                    <XIcon />
                    Advanced analytics.
                </li>
                <li className="mb-4 inline-flex line-through">
                    <XIcon />
                    Custom branding.
                </li>
                <li className="mb-4 inline-flex line-through">
                    <XIcon />
                    Priority support.
                </li>
                </ul>
                {/* Subscribe */}
                <button className="py-2 px-10 rounded-3xl bg-green-500 text-lg text-gray-100 font-medium tracking-wide antialiased shadow-lg transition duration-100 ease-in transform hover:scale-105 hover:bg-green-600">
                Subscribe
                </button>
            </div>

            {/* ::Offer 2 */}
            <div className="col-span-3 lg:col-span-1 my-4 py-9 px-12 flex flex-col items-center bg-white text-gray-600 rounded-2xl shadow-xl">
                {/* Offer name */}
                <h2 className="font-title mb-1 text-xl font-semibold uppercase tracking-wider">
                Pro
                </h2>
                {/* Price */}
                <div className="p-4 flex items-baseline">
                <h3 className="font-title text-5xl font-bold ">$199</h3>
                <span className="ml-2">/ month</span>
                </div>
                {/* Divide line */}
                <span className="w-28 h-1.5 bg-green-500 rounded-3xl" />
                {/* Features */}
                <ul className="my-12 flex flex-col">
                <li className="mb-4 inline-flex">
                    <CheckIcon />
                    Unlimited brainstorming sessions.
                </li>
                <li className="mb-4 inline-flex">
                    <CheckIcon />
                    Access to advanced AI-powered insights.
                </li>
                <li className="mb-4 inline-flex">
                    <CheckIcon />
                    24/7 customer support.
                </li>
                <li className="mb-4 inline-flex">
                    <CheckIcon />
                    Custom branding.
                </li>
                <li className="mb-4 inline-flex">
                    <CheckIcon />
                    Priority support.
                </li>
                <li className="mb-4 inline-flex line-through">
                    <XIcon />
                    Dedicated account manager.
                </li>
                </ul>
                {/* Subscribe */}
                <button className="py-2 px-10 rounded-3xl bg-green-500 text-lg text-gray-100 font-medium tracking-wide antialiased shadow-lg transition duration-100 ease-in transform hover:scale-105 hover:bg-green-600">
                Subscribe
                </button>
            </div>

            {/* ::Offer 3 */}
            <div className="col-span-3 lg:col-span-1 my-4 py-9 px-12 flex flex-col items-center bg-white text-gray-600 rounded-2xl shadow-xl">
                {/* Offer name */}
                <h2 className="font-title mb-1 text-xl font-semibold uppercase tracking-wider">
                Enterprise
                </h2>
                {/* Price */}
                <div className="p-4 flex items-baseline">
                <h3 className="font-title text-5xl font-bold ">$999</h3>
                <span className="ml-2">/ month</span>
                </div>
                {/* Divide line */}
                <span className="w-28 h-1.5 bg-green-500 rounded-3xl" />
                {/* Features */}
                <ul className="my-12 flex flex-col">
                <li className="mb-4 inline-flex">
                    <CheckIcon />
                    Unlimited brainstorming sessions.
                </li>
                <li className="mb-4 inline-flex">
                    <CheckIcon />
                    Access to all AI-powered insights.
                </li>
                <li className="mb-4 inline-flex">
                    <CheckIcon />
                    24/7 customer support.
                </li>
                <li className="mb-4 inline-flex">
                    <CheckIcon />
                    Dedicated account manager.
                </li>
                <li className="mb-4 inline-flex">
                    <CheckIcon />
                    Custom branding.
                </li>
                <li className="mb-4 inline-flex">
                    <CheckIcon />
                    Priority support.
                </li>
                </ul>
                {/* Subscribe */}
                <button className="py-2 px-10 rounded-3xl bg-green-500 text-lg text-gray-100 font-medium tracking-wide antialiased shadow-lg transition duration-100 ease-in transform hover:scale-105 hover:bg-green-600">
                Subscribe
                </button>
            </div>
            </div>
        </div>
        );
};

export default Pricing;
