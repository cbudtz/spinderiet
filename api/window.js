import {useEffect} from "react";

export function useWindow(setWindowWidth) {
    useEffect(() => {
        if (window) {setWindowWidth(window.innerWidth);}
        const handleResize = () => setWindowWidth(window.innerWidth)
        window && window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })
}
export function resolveImage(imageWidth, imageurl) {
    if (imageWidth <= 640 && imageurl?.formats?.small) {
        imageurl = imageurl.formats.small;
    } else if (imageWidth <= 768 && imageurl?.formats?.medium) {
        imageurl = imageurl.formats.medium;
    } else if (imageWidth <= 1024 && imageurl?.formats?.large) {
        imageurl = imageurl.formats.large;
    } else if (imageWidth <= 1920 && imageurl?.formats?.xlarge) {
        imageurl = imageurl.formats.xlarge;
    }
    return imageurl;
}