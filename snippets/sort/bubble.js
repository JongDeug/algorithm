const swap = (arr, i, j) => {
    return [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * 버블 정렬 
 * 
 * 최적화 x, 최악 O(n^2)
 * @param {*} arr 
 * @returns 
 */
const bubbleSortV1 = (arr) => {
    // Outer Loop : 배열의 크기 - 1 만큼
    for (let i = arr.length - 1; i > 0; i--) {
        // Inner Loop : 인접한 요소끼리 비교 후 swap
        for (let j = 0; j < i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}
console.log(bubbleSortV1([8, 3, 1, 5, 6, 7]));

/**
 * 버블 정렬 
 * 
 * 최적화 o, 특정 조건에서 O(n)
 * @param {*} arr 
 */
const bubbleSortV2 = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let noSwap = true;
        for (let j = 0; j < i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                noSwap = false;
            }
        }
        // swap이 한 번도 이뤄지지 않았다면 종료
        if (noSwap) break;
    }
    return arr;
}
console.log(bubbleSortV2([8, 3, 1, 5, 6, 7]));