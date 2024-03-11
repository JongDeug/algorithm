// 재귀로 구현해보자! => 인자가 2개 뿐이라 helper 함수를 구현해야함.
function binarySearch(arr, value) {
    // start, end, middle 이 필요함.
    let start = 0;
    let end = arr.length - 1;

    function helper(start, end) {
        // Base Case도 필요함.
        if (start > end) return -1;
        else {
            let middle = Math.floor((start + end) / 2);
            if (arr[middle] === value) return middle;
            // return 재귀 필요함.
            else if (arr[middle] > value) return helper(start, middle - 1);
            else if (arr[middle] < value) return helper(middle + 1, end);
        }
    }

    return helper(start, end);
}

console.log(binarySearch([1, 2, 3, 4, 5], 6));