const swap = (arr, i, j) => {
    return [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * 선택 정렬
 * 
 * @param {*} arr 
 * @returns 
 */
const selectionSort = (arr) => {
    // Outer Loop : 배열의 크기 - 1 만큼
    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        // Inner Loop: 가장 작은 값의 인덱스를 찾는다.
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx !== i) swap(arr, i, minIdx);
    }
    return arr;
}
console.log(selectionSort([8, 3, 1, 5, 6, 7]));