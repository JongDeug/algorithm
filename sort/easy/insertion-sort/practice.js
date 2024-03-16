function insertionSort(arr) {
    const swap = (arr, i, j) => {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };

    // outer loop
    for (let i = 1; i < arr.length; i++) {
        // inner loop
        for (let j = i; j >= 0; j--) {
            if (arr[j] < arr[j - 1]) {
                swap(arr, j, j - 1);
            } else break;
        }
    }
    return arr;
}

console.log(insertionSort([3,2,10,9,8,7]))