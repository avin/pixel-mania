/**
 * Get two colors distance
 * @param v1
 * @param v2
 * @returns {number}
 */
export function colorDistance(v1, v2) {
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
export function getNearestColor(sourceColor, compareColors) {
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
export function averageColor(colors) {
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
