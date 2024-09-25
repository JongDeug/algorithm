import pivot from './pivot.js';
// [문제 이해하기]
// pivot helper 통해서 퀵 정렬하기
// 입력 : arr, function, 출력 : sorted array
// 핵심 : 재귀로 구현, 새로운 배열을 주는 것이 아니기 때문에 pivot 함수를 사용해서 index 기준으로 나눠야함.
function quickSort(arr, comparator, start = 0, end = arr.length - 1) {
    // Base Case
    if (start < end) {
        let idx = pivot(arr, comparator, start, end);
        quickSort(arr, comparator, start, idx - 1);
        quickSort(arr, comparator, idx + 1);
    }
    // return
    return arr;
}

var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(quickSort(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]
// console.log(quickSort([0, -10, 7, 4]));