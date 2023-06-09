import React from "react";
import {
    DeviceMobileIcon,
    LocationMarkerIcon,
    MailIcon,
} from "@heroicons/react/outline";

const ContactUs = () => {
    return (
        <div className="relative mx-auto py-10 px-4 w-full max-w-7xl bg-gray-50 pt-20">
            <div className="mx-auto max-w-5xl">
                <div>
                    <span className="absolute top-0 left-0 hidden md:block opacity-10">
                        <svg
                            width={250}
                            height={600}
                            fill="none"
                            viewBox="0 0 250 600"
                            aria-hidden="true"
                        >
                            <pattern
                                id="pattern-rectangles"
                                x={0}
                                y={0}
                                width={40}
                                height={40}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect
                                    x={0}
                                    y={0}
                                    width={10}
                                    height={10}
                                    className="text-green-500"
                                    fill="currentColor"
                                />
                            </pattern>
                            <rect
                                width={250}
                                height={600}
                                fill="url(#pattern-rectangles)"
                            />
                        </svg>
                    </span>
                    <span className="absolute bottom-0 right-0 opacity-20">
                        <svg
                            width={300}
                            height={300}
                            fill="none"
                            viewBox="0 0 300 300"
                            aria-hidden="true"
                        >
                            <pattern
                                id="pattern-circles"
                                x="0"
                                y="0"
                                width="30"
                                height="30"
                                patternUnits="userSpaceOnUse"
                                patternContentUnits="userSpaceOnUse"
                            >
                                <circle
                                    id="pattern-circle"
                                    cx="10"
                                    cy="10"
                                    r="5"
                                    className="fill-current text-green-500"
                                />
                            </pattern>
                            <rect
                                id="rect"
                                x="0"
                                y="0"
                                width="100%"
                                height="100%"
                                fill="url(#pattern-circles)"
                            />
                        </svg>
                    </span>
                </div>

                <div className="relative space-y-5">
                    <h2 className="text-center text-5xl text-green-500 font-light">
                        Contact Us
                    </h2>
                    <p className="mx-auto py-5 max-w-3xl text-center text-base text-gray-600">
                        iThink is an AI-powered brainstorming collaboration tool
                        that helps teams generate and refine ideas quickly and
                        efficiently. Contact us to learn more about how iThink
                        can help your team innovate and succeed.
                    </p>
                    <div className="flex flex-wrap justify-between items-center text-base">
                        <div className="m-2.5 inline-flex items-center">
                            <LocationMarkerIcon className="mr-2 w-6 h-6 text-green-500" />
                            <p className="text-gray-600 font-semibold">
                                1234 Neural Network Street, AI City, 01010
                            </p>
                        </div>
                        <div className="m-2.5 inline-flex items-center">
                            <DeviceMobileIcon className="mr-2 w-6 h-6 text-green-500" />
                            <p className="text-gray-600 font-semibold">
                                +1 (555) 123-4567
                            </p>
                        </div>
                        <div className="m-2.5 inline-flex items-center">
                            <MailIcon className="mr-2 w-6 h-6 text-green-500" />
                            <p className="text-gray-600 font-semibold">
                                contact@ithink.com
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative mt-16 rounded border-2 border-gray-200">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8827.330741966553!2d2.308756110118289!3d48.87000842543867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8f3049b%3A0xcbb47407434935db!2s18%20Av.%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris!5e0!3m2!1sfr!2sfr!4v1635492407441!5m2!1sfr!2sfr"
                        title="map"
                        scrolling="no"
                        frameBorder="0"
                        width="100%"
                        height="450"
                        className=""
                        loading="lazy"
                    />
                </div>
                <div className="mt-16">
                    <h3 className="text-center text-3xl text-green-500 font-light mb-5">
                        Meet the Devs
                    </h3>
                    <div className="flex justify-center">
                        <a
                            href="https://www.linkedin.com/in/chris-zambito"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="m-2"
                        >
                            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                                <img
                                    src="https://media.licdn.com/dms/image/D4E35AQFQI_OhuvSizA/profile-framedphoto-shrink_200_200/0/1678845431059?e=1686614400&v=beta&t=RoOkfNR-2dvY22d93YXznw6vtohmVAiygcHPNNOPxFg"
                                    alt="Dev 1"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-center mt-3 text-gray-600 font-semibold">
                                Chris Zambito
                            </p>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/shahemalhadid/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="m-2"
                        >
                            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                                <img
                                    src="https://media.licdn.com/dms/image/D4E35AQGuCyF87KNNaw/profile-framedphoto-shrink_200_200/0/1685899862401?e=1686614400&v=beta&t=ntbDYjLQLHuzJU_prqZayEx1NJ68DW0xSrZ4xEr6kmk"
                                    alt="Dev 2"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-center mt-3 text-gray-600 font-semibold">
                                Shahem Al Hadid
                            </p>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/thomasrawsonj/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="m-2"
                        >
                            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                                <img
                                    src="https://media.licdn.com/dms/image/D4D03AQEq1kFdec1OBg/profile-displayphoto-shrink_200_200/0/1674594005119?e=1691625600&v=beta&t=Tni88hICxYRg-1cD6fyE_lRHs46fq7HxSb7qxX2PCA4"
                                    alt="Dev 3"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-center mt-3 text-gray-600 font-semibold">
                                Thomas Rawson
                            </p>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/rysa-zahedul/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="m-2"
                        >
                            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                                <img
                                    src="https://media.licdn.com/dms/image/D4E03AQH159DoiC952g/profile-displayphoto-shrink_200_200/0/1685139460150?e=1691625600&v=beta&t=-6m8nSEP6FqNw8KfCP4m1dsV45fI3Y7zDJKw2slrqq8"
                                    alt="Dev 4"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-center mt-3 text-gray-600 font-semibold">
                                Rysa Zahedul
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
