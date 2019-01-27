import chroma from 'chroma-js';
import { getImageDataPixel, setImageDataPixel } from '../utils/canvas';
import { averageColor, getNearestColor } from '../utils/colors';

/**
 * Pixalizate image data
 * @param imageData
 * @param pixelSize
 * @param colors
 * @param accurateColors
 * @returns {ImageData}
 */
export default function pixalizator({ imageData, pixelSize = 5, colors, accurateColors }) {
    const { width, height } = imageData;

    colors =
        colors ||
        chroma
            .scale(['#00fa26', '#580008'])
            .mode('lch')
            .colors(16);

    colors = colors.map(color => {
        const result = chroma(color).rgba();
        result[3] = Math.floor(result[3] * 255);
        return result;
    });

    const resultCanvas = document.createElement('canvas');
    resultCanvas.width = width;
    resultCanvas.height = height;

    let outputImageData = resultCanvas.getContext('2d').getImageData(0, 0, width, height);
    for (let x = 0; x < width; x += pixelSize) {
        for (let y = 0; y < height; y += pixelSize) {
            let resultPixel;
            if (accurateColors) {
                const resultPixels = [];

                for (let xI = 0; xI < pixelSize; xI += 1) {
                    for (let yI = 0; yI < pixelSize; yI += 1) {
                        const pixel = getImageDataPixel(imageData, x + xI, y + yI);
                        resultPixels.push(pixel);
                    }
                }

                const averagePixel = averageColor(resultPixels);

                resultPixel = getNearestColor(averagePixel, colors);
            } else {
                const pixel = getImageDataPixel(imageData, x, y);
                resultPixel = getNearestColor(pixel, colors);
            }

            for (let xI = 0; xI < pixelSize; xI += 1) {
                for (let yI = 0; yI < pixelSize; yI += 1) {
                    outputImageData = setImageDataPixel(outputImageData, x + xI, y + yI, resultPixel);
                }
            }
        }
    }

    return outputImageData;
}
