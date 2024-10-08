import React, { useRef, useEffect, useState } from 'react';

const LazyImage = ({ src, alt, className, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    setIsLoaded(true);
                    observer.unobserve(img);
                }
            });
        });

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, []);

    return (
        <img
            ref={imgRef}
            data-src={src}
            alt={alt}
            className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
            {...props}
        />
    );
};

export default LazyImage;