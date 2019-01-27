/**
 * Set ImageData pixel by x/y coordinates
 * @param imageData
 * @param x
 * @param y
 * @param pixel
 * @returns {*}
 */
export function setImageDataPixel(imageData, x, y, pixel) {
    const imageDataWidth = imageData.width;
    for (let i = 0; i < 4; i += 1) {
        imageData.data[(imageDataWidth * y + x) * 4 + i] = pixel[i];
    }
    return imageData;
}

/**
 * Get ImageData pixel by x/y coordinates
 * @param imageData
 * @param x
 * @param y
 * @returns {Array}
 */
export function getImageDataPixel(imageData, x, y) {
    const imageDataWidth = imageData.width;

    const pixel = [];
    for (let i = 0; i < 4; i += 1) {
        pixel[i] = imageData.data[(imageDataWidth * y + x) * 4 + i];
    }
    return pixel;
}
