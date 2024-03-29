import { swap } from '../../../utility/swap.js';

function selectionSort(arr) {
    // Outer loop : 배열의 크기만큼
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        // Inner loop : 정렬된 요소를 제외한 배열에서 minIndex를 찾는다.
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }
        // Outer loop : Inner loop에서 찾은 minIndex와 제일 처음 요소와 swap
        if (minIndex !== i) swap(arr, i, minIndex);
    }
    return arr;
}

console.log(selectionSort([5, 3, 2, 1, 6]));