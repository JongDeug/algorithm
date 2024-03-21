// [문제 이해하기]
// 1,0 으로 구성된 배열이 인자로 들어오는데 1은 항상 0앞에 있음. 0의 개수를 출력하는 함수를 작성해라.
// 입력 : array of integers(0 or 1), 출력 : int
// 핵심 : 시간 복잡도가 O(logn)이여야 함.
// [구체적인 예시]
// countZeroes([1,1,1,1,0,0]) // 2
// countZeroes([1,0,0,0,0]) // 4
// countZeroes([0,0,0]) // 3
// countZeroes([1,1,1,1]) // 0
// [문제 세분화하기]
function countZeroes(arr) {
    // count
    let count = 0;

    // helper 함수
    function recursive(payload) {
        // base case : payload.length === 1 이고, 만약 요소가 1이면 count
        if (payload.length === 1) {
            if (payload[0] === 0) count++;
            // return payload;
            return;
        }

        // 배열의 중간 인덱스 찾기
        let middle = Math.ceil(payload.length / 2);
        // left, right 분리 slice 함수 사용
        let left = payload.slice(0, middle);
        let right = payload.slice(middle);

        recursive(left);
        recursive(right);
    }

    recursive(arr);
    // return count
    return count;
}

//
// let count = 0;
//
// function countZeroes(arr) {
//     if (arr.length === 1) {
//         if (arr[0] === 0) count++;
//         return;
//     }
//
//     // 배열의 중간 인덱스 찾기
//     let middle = Math.ceil(arr.length / 2);
//     // left, right 분리 slice 함수 사용
//     countZeroes(arr.slice(0, middle));
//     countZeroes(arr.slice(middle));
//
//     return count;
// }


console.log(countZeroes([1, 1, 0, 0, 0]));