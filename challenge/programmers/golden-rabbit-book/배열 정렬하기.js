// [문제 이해하기]
// [구체적인 예시 찾기]
// [문제 세분화]

function solution(arr) {
    return arr.sort((a, b) => a - b);
}

console.log(solution([1, -5, 2, 4, 3]));
console.log(solution([2, 1, 1, 3, 2, 5, 4]));
