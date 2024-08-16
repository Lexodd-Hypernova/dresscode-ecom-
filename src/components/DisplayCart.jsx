import React, { useState, useEffect } from 'react';

const DisplayCart = () => {
    const [hideBanner, setHideBanner] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            if (window.innerWidth < 950) {
                setHideBanner(true);
            } else {
                setHideBanner(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div>DisplayCart</div>
    )
}

export default DisplayCart