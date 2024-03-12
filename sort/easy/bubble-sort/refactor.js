// 최적화한다!

let count = 0; // 최적화 됐는지 확인하는 count변수임. 

function bubbleSort(arr) {

    for (let i = arr.length; i > 0; i--) {
        let noSwap = true;
        for (let j = 0; j < i - 1; j++) {
            count++;
            console.log(arr, arr[j], arr[j + 1]);
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

const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
};

console.log(bubbleSort([8, 1, 2, 3, 4, 5, 6, 7]));
console.log(count);
// console.log(bubbleSort([3, 2, 1, 19, 20]))