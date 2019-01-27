import chroma from 'chroma-js';

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

/**
 * Set ImageData pixel by x/y coordinates
 * @param imageData
 * @param x
 * @param y
 * @param pixel
 * @returns {*}
 */
function setImageDataPixel(imageData, x, y, pixel) {
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
function getImageDataPixel(imageData, x, y) {
    const imageDataWidth = imageData.width;

    const pixel = [];
    for (let i = 0; i < 4; i += 1) {
        pixel[i] = imageData.data[(imageDataWidth * y + x) * 4 + i];
    }
    return pixel;
}

/**
 * Get two colors distance
 * @param v1
 * @param v2
 * @returns {number}
 */
function colorDistance(v1, v2) {
    let d = 0;

    for (let i = 0; i < v1.length; i += 1) {
        d += (v1[i] - v2[i]) * (v1[i] - v2[i]);
    }
    return Math.sqrt(d);
}

/**
 * Get nearest color
 * @param sourceColor
 * @param compareColors
 * @returns {number[]}
 */
function getNearestColor(sourceColor, compareColors) {
    let nearestDistance = Number.MAX_SAFE_INTEGER;
    let nearestColor = [0, 0, 0, 0];

    compareColors.forEach(color => {
        const distance = colorDistance(sourceColor, color);
        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestColor = color;
        }
    });

    return nearestColor;
}

/**
 * Get average color of colors array
 * @param colors
 * @returns {*}
 */
function averageColor(colors) {
    const results = colors.reduce(
        (r, color) => {
            for (let i = 0; i < 4; i += 1) {
                r[i] += color[i];
            }
            return r;
        },
        [0, 0, 0, 0],
    );

    for (let i = 0; i < 4; i += 1) {
        results[i] = Math.floor(results[i] / colors.length);
    }

    return results;
}
