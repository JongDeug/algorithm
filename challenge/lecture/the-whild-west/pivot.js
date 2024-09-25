// [문제 이해하기]
// pivot 보다 작은 값 왼쪽, 큰 값 오른쪽으로 재배치 시키는 pivot helper 함수 구현
// 입력 : arr, comparator(없을 수도 있음),출력 : rearranged array
// 핵심 : pivot 은 배열의 제일 처음 index 사용, pivot + 1 에 작은 값들을 다 옮기고 마지막에 pviot을 중간으로 옮겨야 함.
// 핵심2 : 주어진 배열을 그대로 사용해야함. 새로운 배열 생성 x
// [구체적인 예시]
// pivot(arr); // 2 arr; // [3, 2, 4, 5, 6];
// pivot(arr3, strLength); // 1
// [문제 세분화하기]
export default function pivot(arr, comparator, start = 0, end = arr.length - 1) {
    // pivot 설정
    let pivotIndex = start;
    // pivot 보다 작으면 pivot + 1 로 옮겨야 하기 때문
    let lessThanPivot = start;

    const swap = (arr, i, j) => {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };

    // n 반복문
    for (let i = start + 1; i <= end; i++) {
        if (typeof comparator !== 'function') {
            // pivot 과 비교
            // pivot 보다 작으면 옮기기
            if (arr[pivotIndex] >= arr[i]) {
                // lessThanPivot 개수 올리고, 해당 위치랑 swap
                lessThanPivot++;
                if (lessThanPivot !== i) swap(arr, lessThanPivot, i);
            }
        } else {
            // pivot 과 비교
            // pivot 보다 작으면 옮기기
            if (Math.sign(comparator(arr[pivotIndex], arr[i])) === 1) {
                // lessThanPivot 개수 올리고, 해당 위치랑 swap
                lessThanPivot++;
                if (lessThanPivot !== i) swap(arr, lessThanPivot, i);
            }
        }
    }
    // 마지막에 lessThanPivot이랑 pivot이랑 위치 swap 해야 중간으로 갈 수 있음.
    swap(arr, pivotIndex, lessThanPivot);
    pivotIndex = lessThanPivot;

    // return pivot index
    return pivotIndex;
}

// let arr = [4, 2, 5, 3, 6];
// console.log(pivot(arr, null));
// console.log(arr);
//
// var arr1 = [5, 4, 9, 10, 2, 20, 8, 7, 3];
// var arr2 = [8, 4, 2, 5, 0, 10, 11, 12, 13, 16];
// var arr3 = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
//
// function strLength(a, b) {
//     return a.length - b.length
// }
//
// console.log(pivot(arr1));
// console.log(arr1);
// console.log(pivot(arr3, strLength)); // 1
//
// console.log(arr3.slice(0, 1).sort(strLength));
// console.log(arr3.slice(1).sort(strLength));