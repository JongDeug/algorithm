// 분할 정복 패턴
// binary search, quick sort, merge sort 등 많은 곳에서 사용됨.

// 예시) binary search
// 정렬된 배열에서 원하는 key값을 탐색하는 알고리즘
function binarySearch(arr, val) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let middle = Math.floor((left + right) / 2);

        if (arr[middle] === val) return middle;
        else if (arr[middle] > val) right = middle - 1;
        else if (arr[middle] < val) left = middle + 1;
    }
    return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6], 4));
console.log(binarySearch([1, 2, 3, 4, 5, 6], 1));