import { swap } from '../../../utility/swap.js';

// 최적화 x
function bubbleSort1(arr) {
    // Outer loop : 배열의 크기 - 1 만큼
    for (let i = arr.length; i > 0; i--) {
        // Inner loop : 인접한 요소끼리 비교 후 swap, j는 i - 1인 것을 유의.
        for (let j = 0; j < i - 1; j++) {
            if (arr[j] > arr[j + 1]) swap(arr, j, j + 1);
        }
    }
    return arr;
}

console.log(bubbleSort1([8, 1, 2, 3, 4, 5, 6, 7]));

// 최적화 o => O(n)이 될 수 있음.
function bubbleSort2(arr) {
    // Outer loop : 배열의 크기 - 1 만큼
    for (let i = arr.length; i > 0; i--) {
        let noSwap = true;
        // Inner loop : 인접한 요소끼리 비교 후 swap, j는 i - 1인 것을 유의.
        for (let j = 0; j < i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                noSwap = false;
            }
        }
        // 더 이상 스왑할게 없으면 루프 탈출
        if (noSwap) break;
    }
    return arr;
}

console.log(bubbleSort2([8, 1, 2, 3, 4, 5, 6, 7]));

