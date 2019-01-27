import { getImageDataPixel, setImageDataPixel } from '../utils/canvas';
import { colorDistance } from '../utils/colors';

/**
 * Contour filter
 * @param imageData
 * @param distance
 * @param invert
 * @param transparent
 * @param step
 * @returns {ImageData}
 */
export default function contour({ imageData, distance, invert, transparent, step, fillMode }) {
    const { width, height } = imageData;

    const resultCanvas = document.createElement('canvas');
    resultCanvas.width = width;
    resultCanvas.height = height;

    let contourPixel = [0, 0, 0, 255];
    let nonePixel = [255, 255, 255, 255];
    if (invert) {
        [contourPixel, nonePixel] = [nonePixel, contourPixel];
    }

    let outputImageData = resultCanvas.getContext('2d').getImageData(0, 0, width, height);
    for (let x = 0; x < width; x += step) {
        let beforePixel = null;
        for (let y = 0; y < height; y += step) {
            const pixel = getImageDataPixel(imageData, x, y);

            let resultPixel = nonePixel;
            if (beforePixel) {
                const pixelColorDistance = colorDistance(pixel, beforePixel);
                if (pixelColorDistance > distance) {
                    resultPixel = contourPixel;
                }
            }

            if (transparent) {
                nonePixel = [0, 0, 0, 0];
            }

            for (let ix = 0; ix < step; ix += 1) {
                for (let iy = 0; iy < step; iy += 1) {
                    switch (fillMode) {
                        case 'square-fill': {
                            outputImageData = setImageDataPixel(outputImageData, x + ix, y + iy, resultPixel);
                            break;
                        }
                        case 'square-empty': {
                            if (ix === 0 || ix === step - 1 || iy === 0 || iy === step - 1) {
                                outputImageData = setImageDataPixel(outputImageData, x + ix, y + iy, resultPixel);
                            } else {
                                outputImageData = setImageDataPixel(outputImageData, x + ix, y + iy, nonePixel);
                            }
                            break;
                        }
                        case 'rain': {
                            if (ix === iy) {
                                outputImageData = setImageDataPixel(outputImageData, x + ix, y + iy, resultPixel);
                            } else {
                                outputImageData = setImageDataPixel(outputImageData, x + ix, y + iy, nonePixel);
                            }
                            break;
                        }
                        case 'cross': {
                            if (ix === iy || step - 1 - ix === iy) {
                                outputImageData = setImageDataPixel(outputImageData, x + ix, y + iy, resultPixel);
                            } else {
                                outputImageData = setImageDataPixel(outputImageData, x + ix, y + iy, nonePixel);
                            }
                            break;
                        }
                        default:
                    }
                }
            }

            beforePixel = pixel;
        }
    }

    return outputImageData;
}
