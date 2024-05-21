function countTriplets(arr, d) {
    const n = arr.length;
    let count = 0;

    for (let i = 1; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            for (let k = j + 1; k < n; k++) {
                if (i < j && j < k && k < n) {
                    const sum = arr[i] + arr[k];
                    if (sum % d === 0) {
                        count++;
                    }
                }
            }
        }
    }

    return count;
}

// Example usage:
const a = [3, 3, 4, 7, 8];
const d = 5;
const result = countTriplets(a, d);
console.log(result); // Output: 3