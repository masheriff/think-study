import React, { useState, useEffect } from 'react';

const VerticalLineScroll = () => {
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
                    className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#C5FF64] rounded-full"
                    style={{
                        bottom: `calc(${circlePosition} - 20px)`
                    }}
                />
            </div>
        </div>
    );
};

export default VerticalLineScroll;