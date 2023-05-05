import { createRef, useState } from "react";

const Carousel = ({ images }) => {
    // We will start by storing the index of the current image in the state.
    const [currentImage, setCurrentImage] = useState(0);

    // We are using react ref to 'tag' each of the images. Below will create an array of
    // objects with numbered keys. We will use those numbers (i) later to access a ref of a
    // specific image in this array.
    const refs = images?.reduce((acc, val, i) => {
        acc[i] = createRef();
        return acc;
    }, {});

    const scrollToImage = i => {
        // First let's set the index of the image we want to see next
        setCurrentImage(i);
        // Now, this is where the magic happens. We 'tagged' each one of the images with a ref,
        // we can then use built-in scrollIntoView API to do exactly what it says on the box - scroll it into
        // your current view! To do so we pass an index of the image, which is then use to identify our current
        // image's ref in 'refs' array above.
        refs[i].current.scrollIntoView({
            //     Defines the transition animation.
            behavior: 'smooth',
            //      Defines vertical alignment.
            block: 'nearest',
            //      Defines horizontal alignment.
            inline: 'start',
        });
    };

    // Some validation for checking the array length could be added if needed
    const totalImages = images?.length;

    // Below functions will assure that after last image we'll scroll back to the start,
    // or another way round - first to last in previousImage method.
    const nextImage = () => {
        if (currentImage >= totalImages - 1) {
            scrollToImage(0);
        } else {
            scrollToImage(currentImage + 1);
        }
    };

    const previousImage = () => {
        if (currentImage === 0) {
            scrollToImage(totalImages - 1);
        } else {
            scrollToImage(currentImage - 1);
        }
    };

    // Tailwind styles. Most importantly notice position absolute, this will sit relative to the carousel's outer div.
    const arrowStyle =
        'absolute text-white text-2xl z-10 bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center';

    // Let's create dynamic buttons. It can be either left or right. Using
    // isLeft boolean we can determine which side we'll be rendering our button
    // as well as change its position and content.
    const sliderControl = isLeft => (
        <>{totalImages > 1 && <button
            type="button"
            onClick={isLeft ? previousImage : nextImage}
            className={`${arrowStyle} ${isLeft ? 'left-2' : 'right-2'}`}
            style={{ top: '40%' }}
        >
            <span role="img" aria-label={`Arrow ${isLeft ? 'left' : 'right'}`}>
                {isLeft ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                }
            </span>
        </button>}</>
    );

    return (
        // <div className="p-12 flex justify-center w-screen md:w-1/2 items-center">
        <div className="relative w-full">
            <div className="carousel rounded-3xl">
                {sliderControl(true)}
                {images?.map((img, i) => (
                    <div className="w-full flex-shrink-0 flex items-center" key={img} ref={refs[i]}>
                        <img src={img} className="w-full object-contain" />
                    </div>
                ))}
                {sliderControl()}
            </div>
        </div>
        // </div>
    );
};

export default Carousel;