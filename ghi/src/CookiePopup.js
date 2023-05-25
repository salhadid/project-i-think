import React, { useState } from "react";

const CookiePopup = () => {
    const [showPopup, setShowPopup] = useState(true);

    const handleClose = () => {
        setShowPopup(false);
    };

    return (
        <>
        {showPopup && (
            <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold">Cookies? Yum!</h3>
                    <p className="text-sm">
                    We must confess - we've baked some digital cookies
                    (unfortunately non-edible) into our site. Why, you ask? Well,
                    these sneaky little data bits help us personalize content and
                    ads, whip up some social media features, and churn out some
                    good ol' web traffic analysis. And like the sharing, caring
                    souls we are, we let our social media, advertising, and
                    analytics partners in on your cookie consumption. They might
                    mix it with other info you've given them, or that they've
                    gathered from your buffet of services. Scandalous, we know.
                    </p>
                </div>
                <div className="flex items-center">
                    <button
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg mr-4"
                    onClick={handleClose}
                    >
                    I'm in, pass the milk!
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}
        </>
    );
};

export default CookiePopup;

// import React, { useState } from "react";

// const CookiePopup = () => {
//     const [showPopup, setShowPopup] = useState(true);

//     const handleClose = () => {
//         setShowPopup(false);
//     };

//     return (
//         <>
//         {showPopup && (
//             <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4">
//             <div className="max-w-7xl mx-auto">
//                 <div className="flex flex-col md:flex-row items-center justify-between">
//                 <div className="mb-4 md:mb-0">
//                     <h3 className="text-lg font-bold">Our site uses cookies</h3>
//                     <p className="text-sm">
//                     We use cookies to personalize content and ads, to provide
//                     social media features and to analyze our traffic. We also
//                     share information about your use of our site with our social
//                     media, advertising and analytics partners who may combine it
//                     with other information that you've provided to them or that
//                     they've collected from your use of their services.
//                     </p>
//                 </div>
//                 <div className="flex items-center">
//                     <button
//                     className="bg-white text-gray-900 px-4 py-2 rounded-lg mr-4"
//                     onClick={handleClose}
//                     >
//                     Okay, I get it
//                     </button>
//                     <img
//                     src="https://media.giphy.com/media/3o7aCSPqXE5C6T8tBC/giphy.gif"
//                     alt="Cookie Monster"
//                     className="w-16 h-16"
//                     />
//                 </div>
//                 </div>
//             </div>
//             </div>
//         )}
//         </>
//     );
// };

// export default CookiePopup;
