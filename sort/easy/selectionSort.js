function selectionSort(arr) {

    // outer loop : 배열의 크기만큼 루프를 돈다. i는 0 to arr.length
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        // inner loop : 정렬된 요소를 제외한 배열에서 min index를 찾는다. j는 i+1(i라고 해도 minindex가 i니까 굳이 돌 필요없음) to arr.length
        for (let j = i+1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }
        // outer loop : inner loop에서 찾은 min index 값을 참고해서 제일 처음 요소와 swap 한다.
        if (minIndex !== i) swap(arr, i, minIndex);
        console.log(arr)
    }
    // arr 반환
    return arr;
}

const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
};

console.log(selectionSort([5,3,2,1,6]))