import React, { useState } from "react";

const SocialShare = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col items-center">
            <button
                className="group mb-1 w-11 h-11 inline-flex justify-center items-center rounded-full border-2 border-gray-200 bg-white"
                onClick={() => setOpen(!open)}
            >
                <svg
                    className={`w-5 h-5 ${
                        open
                            ? "text-gray-400 group-hover:text-gray-600"
                            : "text-blue-500 group-hover:text-blue-600"
                    }`}
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z" />
                </svg>
            </button>

            <div className={`${open ? "flex" : "hidden"} flex-col`}>
                <div
                    className="w-16 pb-1.5 pt-3 border-2 border-b border-gray-100 bg-gray-50 text-center text-gray-600 font-oswald uppercase"
                    style={{
                        clipPath:
                            "polygon(0 100%, 100% 100%, 100% 15%, 60% 15%, 50% 0, 40% 15%, 0 15%)",
                    }}
                >
                    Share
                </div>

                <div className="grid grid-rows-1">
                    <a
                        href="https://www.galvanize.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="row-span-1 group w-16 h-16 inline-flex justify-center items-center border-2 border-t border-b border-gray-100 bg-white hover:bg-gray-50"
                    >
                        <svg
                            className="w-5 h-5 group-hover:opacity-70"
                            color="#1DA1F2"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                    </a>
                    <a
                        href="https://www.galvanize.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="row-span-1 group w-16 h-16 inline-flex justify-center items-center border-2 border-t border-b border-gray-100 bg-white hover:bg-gray-50"
                    >
                        <svg
                            className="w-6 h-6 group-hover:opacity-70"
                            color="#4267B2"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M16.403,9H14V7c0-1.032,0.084-1.682,1.563-1.682h0.868c0.552,0,1-0.448,1-1V3.064c0-0.523-0.401-0.97-0.923-1.005C15.904,2.018,15.299,1.999,14.693,2C11.98,2,10,3.657,10,6.699V9H8c-0.552,0-1,0.448-1,1v2c0,0.552,0.448,1,1,1l2-0.001V21c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-8.003l2.174-0.001c0.508,0,0.935-0.381,0.993-0.886l0.229-1.996C17.465,9.521,17.001,9,16.403,9z" />
                        </svg>
                    </a>
                    <a
                        href="https://www.galvanize.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="row-span-1 group w-16 h-16 inline-flex justify-center items-center border-2 border-t border-b border-gray-100 bg-white hover:bg-gray-50"
                    >
                        <svg
                            className="w-6 h-6 group-hover:opacity-70"
                            color="#DB4437"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="m21.823 9h-2.187v2.177h-2.177v2.187h2.177v2.177h2.187v-2.177h2.177v-2.187h-2.177z" />
                            <path d="m7.5 19.5c4.328 0 7.203-3.038 7.203-7.326 0-.491-.051-.87-.122-1.248h-7.08v2.578h4.257c-.174 1.095-1.289 3.233-4.257 3.233-2.557 0-4.645-2.118-4.645-4.737s2.087-4.738 4.645-4.738c1.463 0 2.435.624 2.988 1.156l2.036-1.954c-1.311-1.227-2.999-1.964-5.025-1.964-4.144 0-7.5 3.356-7.5 7.5s3.356 7.5 7.5 7.5z" />
                        </svg>
                    </a>
                    <a
                        href="https://www.galvanize.com/"
                        className="row-span-1 group w-16 h-16 inline-flex justify-center items-center border-2 border-t border-b border-gray-100 bg-white hover:bg-gray-50"
                    >
                        <svg
                            className="w-5 h-5 group-hover:opacity-70"
                            color="#F4B400"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                        </svg>
                    </a>
                    <button className="row-span-1 group w-16 h-16 inline-flex justify-center items-center border-2 border-t border-b border-gray-100 bg-white hover:bg-gray-50">
                        <svg
                            className="w-5 h-5 text-gray-400 group-hover:opacity-70"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SocialShare;
