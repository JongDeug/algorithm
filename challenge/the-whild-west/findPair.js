// [문제 이해하기]
// 정렬되지 않는 배열, 숫자 n이 주어졌을 때 배열에서 요소의 차이가 n인 쌍이 존재하는지 확인하는 함수
// 입력 : unsorted array, n(integer), 출력 : boolean
// 핵심 : O(n)의 시간 복잡도를 가지도록 구성해봅시다. (일단 ㅇㅇ.)
// [구체화된 예시찾기]
// findPair([6,1,4,10,2,4], 2) // true
// findPair([8,6,2,4,1,0,2,5,13],1) // true
// findPair([], 0) // false
// function findPair(arr, n) {
//     // arr가 비어있을 경우 false 반환
//     if (arr.length === 0) return false;
//
//     // 멀티플 포인터 사용.
//     let i = 0;
//     let j = 1;
//
//     // 배열 정렬
//     arr.sort((a, b) => a - b);
//
//     // 반복문
//     // 아니 이게 틀렸어 ;;;; 맞네 이건 계속 반복하겠네 넘을 때까지
//     while (i <= j) {
//         let candidate = Math.abs(arr[j] - arr[i]);
//         let absN = Math.abs(n);
//         if (candidate === absN) return true;
//
//         if (candidate < absN) j++;
//         else if (candidate > absN) i++;
//     }
//     return false;
// }

// 정답
function findPair(arr, n) {
    // arr가 비어있을 경우 false 반환
    if (arr.length === 0) return false;

    // 멀티플 포인터 사용.
    let i = 0;
    let j = 1;

    // 배열 정렬
    arr.sort((a, b) => a - b);

    // 반복문
    while (j < arr.length) {
        let candidate = Math.abs(arr[j] - arr[i]);
        let absN = Math.abs(n);
        if (candidate === absN) return true;

        if (candidate < absN) j++;
        else if (candidate > absN) {
            i++;
            if (i === j) j++;
        }
    }
    return false;
}

console.log(findPair([6, 1, 4, 10, 2, 4], 2));
console.log(findPair([1, 3, 4, 6], -2));
console.log(findPair([], 0));
console.log(findPair([0, 1, 3, 4, 6], -2));
console.log(findPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1));