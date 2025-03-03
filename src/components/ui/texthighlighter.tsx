import React from 'react';

interface TextHighlighterProps {
    text: string;
}

const TextHighlighter: React.FC<TextHighlighterProps> = ({ text }) => {
    // const parts = text.split(/\|(.*?)\|/g).filter(Boolean);

    return (
        <>
            {/* {parts.map((part, index) => {
                if (index % 2 !== 0) {
                    return (
                        <span key={index} className="text-red-500" dangerouslySetInnerHTML={{ __html: part }} />
                    );
                } else {
                    const segments = part.split('<br />');
                    return (
                        segments.map((segment, i) => (
                            <React.Fragment key={i}>
                                <span dangerouslySetInnerHTML={{ __html: segment }} />
                                {i < segments.length - 1 && <br />}
                            </React.Fragment>
                        ))
                    );
                }
            })} */}
        </>
    );
};

export default TextHighlighter;