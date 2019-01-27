export function mostCommonArrayElement(arr) {
    const counts = {};
    arr.forEach(arrEl => {
        const key = JSON.stringify(arrEl);
        counts[key] = counts[key] || { count: 0, value: arrEl };
        counts[key].count += 1;
    });

    let maxCount = 0;
    let maxValue;
    for (const key of Object.keys(counts)) {
        if (counts[key].count > maxCount) {
            maxCount = counts[key].count;
            maxValue = counts[key].value;
        }
    }
    return maxValue;
}
