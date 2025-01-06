const swap = (arr, i, j) => {
    return [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * 삽입 정렬
 * 
 * 최악 O(n^2)
 * @param {*} arr 
 * @returns 
 */
const insertionSortV1 = (arr) => {
    // Outer Loop : 배열의 크기 - 1 만큼
    for (let i = 1; i < arr.length; i++) {
        // Inner loop : 2번째 요소부터 시작해 left side에 적절한 위치를 찾는다.
        for (let j = i; j >= 0; j--) {
            if (arr[j] < arr[j - 1]) swap(arr, j, j - 1);
            else break;
        }
    }
    return arr;
}
console.log(insertionSortV1([8, 3, 1, 5, 6, 7]));

/**
 * 삽입 정렬
 * 
 * 최악 O(n^2)
 * @param {*} arr 
 * @returns 
 */
const insertionSortV2 = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        let selectElement = arr[i];
        let j;

        for (j = i - 1; j >= 0 && selectElement < arr[j]; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = selectElement;
    }
    return arr;
}
console.log(insertionSortV2([8, 3, 1, 5, 6, 7]));