import { swap } from '../../../utility/swap.js';

// 방법 1
function insertionSort1(arr) {
    // Outer loop : 배열의 크기 - 1 만큼
    for (let i = 1; i < arr.length; i++) {
        let element = arr[i];
        let j;

        // Inner loop : 2번째 요소부터 시작해 left side에 적절한 위치를 찾는다.
        for (j = i - 1; j >= 0 && element < arr[j]; j--) {
            arr[j + 1] = arr[j];
        }

        // Outer loop : 적절한 위치에 삽입한다.
        arr[j + 1] = element;
    }
    return arr;
}

// 방법 2
function insertionSort2(arr) {
    // Outer loop : 배열의 크기 - 1 만큼
    for (let i = 1; i < arr.length; i++) {
        // Inner loop : 2번째 요소부터 시작해 left side에 적절한 위치를 찾는다.
        for (let j = i; j >= 0; j--) {
            // Outer loop : 적절한 위치에 삽입한다.
            if (arr[j] < arr[j - 1]) {
                swap(arr, j, j - 1);
            } else break;
        }
    }
    return arr;
}

console.log(insertionSort1([5, 3, 2, 1, 6]));
console.log(insertionSort2([3, 2, 10, 9, 8, 7]));
