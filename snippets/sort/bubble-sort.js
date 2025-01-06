const swap = (arr, i, j) => {
    return [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * 버블 정렬 
 * 
 * 최적화 x, O(n^2)
 * @param {*} arr 
 * @returns 
 */
const bubbleSortV1 = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
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
        // swap이 한 번도 이뤄지지 않았따면 종료
        if (noSwap) break;
    }
}
console.log(bubbleSortV2(arr, i, j));