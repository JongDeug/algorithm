import {swap} from '../../../utility/swap.js';

// Main 함수
function quickSort(arr, start = 0, end = arr.length - 1) {
    if (start < end) {
        // merge sort(새로운 배열 생성)와 다르게 주어진 배열을 index를 통해 정렬함.
        let pivotIdx = pivot(arr, start, end);
        quickSort(arr, start, pivotIdx - 1); // left
        quickSort(arr, pivotIdx + 1, end); // right
    }
    return arr;
}

// 피벗을 선택해서 작은 것은 left, 큰 것은 right 으로 옮기는 작업을 하는 함수
function pivot(arr, start = 0, end = arr.length - 1) {
    let pivot = arr[start];
    let lessThanPivot = start; // 중요함. pivot 보다 작은 요소들 카운팅 + index

    // pivot 보다 작은 것들을 한 쪽으로 모으는 작업
    for (let i = start + 1; i <= end; i++) {
        if (pivot > arr[i]) {
            lessThanPivot++;
            swap(arr, i, lessThanPivot);
        }
    }
    // 마지막으로 pivot 위치를 옮겨 left, right 완성시킴.
    swap(arr, start, lessThanPivot);
    return lessThanPivot;
}

console.log(quickSort([5, 2, 1, 8, 4, 7, 6, 3]));

