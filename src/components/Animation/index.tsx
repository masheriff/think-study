import React, { useState, useEffect, useRef } from 'react';

const VerticalLineScroll = () => {
    const [lineStyle, setLineStyle] = useState({ backgroundImage: 'linear-gradient(to top, #C1F177, 0%, black 0%)' });
    const circleRef = useRef(null);
    const lineHeight = 400;

    useEffect(() => {
        let animationFrameId: number;
        let startTime: number | undefined;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / 2000;

            if (progress >= 0 && progress <= 1) {
                const circlePosition = progress * lineHeight;
                console.log('circlePosition', circlePosition);
                let newBackground = '';

                // Initially black, then transitioning to green based on progress
                const greenPercentage = Math.min(progress * 100, 100);
                newBackground = `linear-gradient(to top,  #C1F177 ${greenPercentage}%, black ${greenPercentage}%)`;


                setLineStyle({ backgroundImage: newBackground });
            }


            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="absolute left-[10px] mt-[21px]">
            <div className="relative h-96 w-2 mx-auto">

                <div
                    className="absolute left-1/2 transform -translate-x-1/2 h-full w-2 "
                    style={lineStyle}
                ></div>


                <div
                    ref={circleRef}
                    className="absolute left-1/2 w-10 h-10 bg-lime-300 rounded-full animate-circle"
                    style={{
                        animationDuration: '2s',
                        animationFillMode: 'forwards',
                        animationTimingFunction: 'linear'
                    }}
                />
            </div>
        </div>
    );
};

// Define the keyframes and animation
const style = `
  @keyframes circle-scroll {
    from {
      transform: translateX(-50%);
      bottom: 0;
    }
    to {
      transform: translateX(-50%);
      bottom: 100%;
    }
  }

  .animate-circle {
    animation-name: circle-scroll;
  }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = style;
document.head.appendChild(styleSheet);

export default VerticalLineScroll;