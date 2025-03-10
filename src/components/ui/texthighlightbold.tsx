interface TextHighlightBoldProps {
    text: string;
}

const TextHighlightBold: React.FC<TextHighlightBoldProps> = ({ text }) => {
    // Split the text using a regex that captures text between | symbols.
    const parts = text.split(/\|(.*?)\|/g);

    return (
        <>
            {parts.map((part, index) =>
                // Every odd-indexed part (index % 2 === 1) comes from text between the "|" symbols.
                index % 2 === 1 ? (
                    <span key={index} style={{ color: 'black', fontWeight: 'bold' }}>
                        {part}
                    </span>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </>
    );
};

export default TextHighlightBold;
