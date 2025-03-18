import React, { useState, useEffect } from 'react';

export const VerticalLineScroll = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let startTime: number | undefined;
        const duration = 2000; // 2 seconds

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const newProgress = Math.min(elapsed / duration, 1);

            setProgress(newProgress);

            if (newProgress < 1) {
                requestAnimationFrame(animate);
            }
        };

        const animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    const greenPercentage = Math.min(progress * 100, 100);
    const circlePosition = `${progress * 100}%`;

    return (
        <div className="absolute left-3 mt-5">
            <div className="relative h-96 w-2 mx-auto">
                {/* Vertical line with gradient */}
                <div
                    className="absolute left-1/2 transform -translate-x-1/2 h-full w-2"
                    style={{
                        backgroundImage: `linear-gradient(to top, #C1F177 ${greenPercentage}%, black ${greenPercentage}%)`
                    }}
                />

                {/* Circle that moves up */}
                <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#C1F177] rounded-full"
                    style={{
                        bottom: `calc(${circlePosition} - 20px)`
                    }}
                />
            </div>
        </div>
    );
};

export const HorizontalLineScroll = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let startTime: number | undefined;
        const duration = 2000; // 2 seconds

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const newProgress = Math.min(elapsed / duration, 1);

            setProgress(newProgress);

            if (newProgress < 1) {
                requestAnimationFrame(animate);
            }
        };

        const animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    const greenPercentage = Math.min(progress * 100, 100);
    const circlePosition = `${progress * 100}%`;

    return (
        <div className="mt-2 mb-8 pr-8">
            <div className="relative w-full h-2 mx-auto">
                {/* Horizontal line with gradient */}
                <div
                    className="absolute top-1/2 transform -translate-y-1/2 w-full h-2"
                    style={{
                        backgroundImage: `linear-gradient(to right, #C1F177 ${greenPercentage}%, black ${greenPercentage}%)`
                    }}
                />

                {/* Circle that moves right */}
                <div
                    className="absolute top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#C1F177] rounded-full"
                    style={{
                        left: `calc(${circlePosition} - 20px)`
                    }}
                />
            </div>
        </div>
    );
};