// parameter default value 주의하기.
function quickSort(arr, start = 0, end = arr.length - 1) {
    if (start < end) {
        let pivotIdx = pivot(arr, start, end);
        quickSort(arr, start, pivotIdx - 1); // left
        quickSort(arr, pivotIdx + 1, end); // right
    }
    return arr; // 중간 과정에선 사용하지 않음. 마지막 확인할 때만 사용함.
}

function pivot(arr, start = 0, end = arr.length - 1) {
    const swap = (arr, i, j) => {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };

    let pivot = arr[start];
    let lessThanPivot = start; // 중요해요!

    for (let i = start + 1; i <= end; i++) {
        if (pivot > arr[i]) {
            lessThanPivot++;
            swap(arr, i, lessThanPivot);
        }
    }
    swap(arr, start, lessThanPivot);
    return lessThanPivot;
}

console.log(quickSort([5, 2, 1, 8, 4, 7, 6, 3]));

