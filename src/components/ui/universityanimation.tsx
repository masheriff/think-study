import React from 'react';
import Image from 'next/image';


interface Media {
    url: string;
    [key: string]: string;
}

interface UniversityImageItem {
    image: number | Media;
    id?: string | null | undefined;
}

interface UniversityLogoScrollProps {
    universitiesImages: UniversityImageItem[];
}

const UniversityLogoScroll: React.FC<UniversityLogoScrollProps> = ({ universitiesImages }) => {
    // Filter and type guard valid images
    const validImages = universitiesImages.filter(
        (image): image is UniversityImageItem & { image: Media } =>
            typeof image.image !== 'number' && 'url' in image.image
    );

    return (
        <div className="relative h-[200px] overflow-hidden">
            {/* Animation container */}
            <div className="animate-seamless-scroll absolute w-full">
                {/* First set of logos */}
                <div className="flex flex-wrap w-full">
                    {validImages.map((universityImage, index) => (
                        <div
                            key={`set1-${index}`}
                            className="w-1/3 sm:w-1/6 lg:w-1/12 p-4 bg-gray-100 rounded-3xl m-2"
                        >
                            <div className="w-full h-[50px] relative">
                                <Image
                                    src={universityImage.image.url || ''}
                                    alt="University Logo"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Second set of logos (exact duplicate) */}
                <div className="flex flex-wrap w-full">
                    {validImages.map((universityImage, index) => (
                        <div
                            key={`set2-${index}`}
                            className="w-1/3 sm:w-1/6 lg:w-1/12 p-4 bg-gray-100 rounded-3xl m-2"
                        >
                            <div className="w-full h-[50px] relative">
                                <Image
                                    src={universityImage.image.url || ''}
                                    alt="University Logo"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UniversityLogoScroll;