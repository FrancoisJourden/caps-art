import type {Cap, Size, CapColored} from "../types";

export default (caps: Cap[], boardSize: Size, image: ImageData) => {
    const wRatio = image.width/boardSize.width;
    const hRatio = image.height/boardSize.height;

    return caps.map((c: Cap): CapColored => ({
        ...c,
        color: getImagePixel(
            image,
            Math.min(Math.floor(c.x * wRatio), image.width-1),
            Math.min(Math.floor(c.y * hRatio), image.height-1),
        )
    }));
}

const getImagePixel = (image: ImageData, x: number, y: number) => {
    const index = (y * image.width + x) * 4;
    return `#${toHex(image.data[index])}${toHex(image.data[index + 1])}${toHex(image.data[index + 2])}${toHex(image.data[index + 3])}`;
}

const toHex = (value: number): string => value.toString(16).padStart(2, '0');