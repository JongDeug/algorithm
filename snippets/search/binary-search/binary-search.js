function binarySearch(arr, value) {
    let start = 0;
    let end = arr.length - 1;

    // Helper function pattern
    function search(start, end) {
        // Base Case
        if (start > end) return -1;
        else {
            let middle = Math.floor((start + end) / 2);
            if (arr[middle] === value) return middle;
            else if (arr[middle] > value) return search(start, middle - 1);
            else if (arr[middle] < value) return search(middle + 1, end);
        }
    }

    return search(start, end);
}

// console.log(binarySearch([1, 2, 3, 4, 5], 2));
console.log(binarySearch([1, 2, 3, 4, 5, 6], 1));